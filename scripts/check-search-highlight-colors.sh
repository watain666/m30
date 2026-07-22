#!/usr/bin/env bash

set -euo pipefail

output_dir="$(mktemp -d)"
trap 'rm -rf "$output_dir"' EXIT

hugo --destination "$output_dir" --cleanDestinationDir --quiet

compiled_css="$(find "$output_dir" -maxdepth 1 -name 'book*.css' -print -quit)"
article_html="$(find "$output_dir" -name 'index.html' -print -quit)"

if [ -z "$compiled_css" ] || ! grep -qF -- '--search-highlight-background' "$compiled_css"; then
  echo 'FAIL: rendered CSS lacks a shared search highlight background token' >&2
  exit 1
fi

if ! grep -qF -- '.book-search-excerpt mark,mark.search-highlight,.search-highlight{background-color:var(--search-highlight-background);color:var(--search-highlight-color)' "$compiled_css"; then
  echo 'FAIL: search results and article passages do not share one highlight rule' >&2
  exit 1
fi

if [ -z "$article_html" ] || grep -qF -- 'background-color: #ffe066' "$article_html"; then
  echo 'FAIL: rendered article pages retain an inline search highlight color' >&2
  exit 1
fi

echo 'PASS: search results and article passages use the shared highlight color token'
