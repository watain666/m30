#!/usr/bin/env bash

set -euo pipefail

release_tag="${1:-}"
previous_release_tag="${2:-}"
release_title="${3:-}"
notes_file="${4:-}"

usage() {
  printf '%s\n' \
    'Usage:' \
    '  make release-notes-check \' \
    '    RELEASE_TAG=vX.Y.Z \' \
    '    PREVIOUS_RELEASE_TAG=vA.B.C \' \
    '    RELEASE_TITLE=vX.Y.Z \' \
    '    RELEASE_NOTES_FILE=/path/to/completed-release-notes.md'
}

fail() {
  printf 'FAIL: %s\n' "$1" >&2
  exit 1
}

semver_pattern='^v[0-9]+\.[0-9]+\.[0-9]+$'

if [[ -z "$release_tag" || -z "$previous_release_tag" ||
      -z "$release_title" || -z "$notes_file" ]]; then
  usage >&2
  exit 2
fi

if [[ ! "$release_tag" =~ $semver_pattern ]]; then
  fail "RELEASE_TAG must use vMAJOR.MINOR.PATCH format: $release_tag"
fi

if [[ ! "$previous_release_tag" =~ $semver_pattern ]]; then
  fail "PREVIOUS_RELEASE_TAG must use vMAJOR.MINOR.PATCH format: $previous_release_tag"
fi

if [[ "$release_title" != "$release_tag" ]]; then
  fail "RELEASE_TITLE must exactly match RELEASE_TAG: $release_tag"
fi

git rev-parse --verify --quiet "refs/tags/$release_tag" >/dev/null ||
  fail "release tag does not exist: $release_tag"

git rev-parse --verify --quiet "refs/tags/$previous_release_tag" >/dev/null ||
  fail "previous published Release tag does not exist: $previous_release_tag"

git merge-base --is-ancestor "$previous_release_tag" "$release_tag" ||
  fail "$previous_release_tag is not an ancestor of $release_tag"

included_tags="$({
  git tag \
    --sort=version:refname \
    --merged "$release_tag" \
    --no-merged "$previous_release_tag"
} | awk '/^v[0-9]+\.[0-9]+\.[0-9]+$/')"

if [[ -z "$included_tags" ]]; then
  fail "no semantic-version tags found after $previous_release_tag through $release_tag"
fi

first_included_tag="$(printf '%s\n' "$included_tags" | sed -n '1p')"
last_included_tag="$(printf '%s\n' "$included_tags" | tail -n 1)"
included_tag_count="$(printf '%s\n' "$included_tags" | awk 'NF { count++ } END { print count + 0 }')"

if [[ "$last_included_tag" != "$release_tag" ]]; then
  fail "latest tag in the Release range is $last_included_tag, expected $release_tag"
fi

if [[ "$included_tag_count" -eq 1 ]]; then
  expected_heading="## What's New in $release_tag"
else
  expected_heading="## What's New in $first_included_tag - $release_tag"
fi

if [[ "$notes_file" == '-' ]]; then
  notes="$(cat)"
else
  [[ -f "$notes_file" ]] || fail "Release notes file does not exist: $notes_file"
  notes="$(<"$notes_file")"
fi

[[ -n "$notes" ]] || fail 'Release notes body is empty'

notes="${notes//$'\r'/}"

printf '%s\n' "$notes" | awk -v expected_heading="$expected_heading" '
  BEGIN {
    section_rank["Added"] = 1
    section_rank["Changed"] = 2
    section_rank["Fixed"] = 3
    section_rank["Removed"] = 4
    current_rank = 0
    current_bullets = 0
    total_bullets = 0
    failed = 0
  }

  function report(message) {
    printf "FAIL: line %d: %s\n", NR, message > "/dev/stderr"
    failed = 1
  }

  NR == 1 {
    if ($0 != expected_heading) {
      report("expected heading: " expected_heading)
    }
    next
  }

  $0 == "" {
    next
  }

  substr($0, 1, 4) == "### " {
    section = substr($0, 5)
    rank = section_rank[section]

    if (rank == 0) {
      report("unsupported section: " section)
      next
    }

    if (current_rank > 0 && current_bullets == 0) {
      report("previous section has no bullets")
    }

    if (rank <= current_rank) {
      report("sections must be unique and ordered Added, Changed, Fixed, Removed")
    }

    current_rank = rank
    current_bullets = 0
    next
  }

  {
    if (current_rank == 0) {
      report("content must appear under an allowed section")
      next
    }

    if (substr($0, 1, 2) != "- ") {
      report("section content must use single-line Markdown bullets")
      next
    }

    bullet = substr($0, 3)

    if (bullet == "") {
      report("bullet must not be empty")
    }

    if (bullet ~ /\.$/ || bullet ~ /。$/) {
      report("bullet must not end with a period")
    }

    if (bullet ~ /vX\.Y\.Z/ || bullet ~ /vA\.B\.C/ ||
        bullet ~ /\/path\/to\// || bullet ~ /^Describe /) {
      report("replace all template placeholders")
    }

    current_bullets++
    total_bullets++
  }

  END {
    if (current_rank == 0) {
      report("at least one allowed section is required")
    } else if (current_bullets == 0) {
      report("final section has no bullets")
    }

    if (total_bullets == 0) {
      report("at least one release-note bullet is required")
    }

    exit failed
  }
'

printf 'PASS: %s follows the Release note format for %s..%s\n' \
  "$notes_file" \
  "$previous_release_tag" \
  "$release_tag"
