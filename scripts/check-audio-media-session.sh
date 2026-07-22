#!/usr/bin/env bash

set -euo pipefail

output_dir="$(mktemp -d)"
trap 'rm -rf "$output_dir"' EXIT

require_contains() {
  local file_path="$1"
  local expected_text="$2"

  if ! grep -qF "$expected_text" "$file_path"; then
    echo "FAIL: expected '$expected_text' in $file_path" >&2
    exit 1
  fi
}

hugo --destination "$output_dir" --cleanDestinationDir --quiet

day_15_page="$output_dir/day/15/index.html"
guide_page="$output_dir/day/guide/index.html"

require_contains "$day_15_page" 'data-title="放下控制"'
require_contains "$day_15_page" 'navigator.mediaSession.metadata = new MediaMetadata'
require_contains "$day_15_page" 'updateMediaSession(instance);'
require_contains "$guide_page" 'data-title="《奇蹟30》心靈轉化之旅：從覺察、寬恕到豐盛，如何轉換知見擁抱奇蹟"'
require_contains "$guide_page" 'data-artist="奇蹟 30"'

player_count="$(grep -Rho '<audio controls class="player"' "$output_dir" | wc -l | tr -d ' ')"
title_count="$(grep -RhoE 'data-title="[^"]+"' "$output_dir" | wc -l | tr -d ' ')"
artist_count="$(grep -RhoE 'data-artist="[^"]+"' "$output_dir" | wc -l | tr -d ' ')"

if [ "$player_count" -ne "$title_count" ] || [ "$player_count" -ne "$artist_count" ]; then
  echo "FAIL: expected title and artist metadata for all $player_count players; found $title_count titles and $artist_count artists" >&2
  exit 1
fi

echo "PASS: $player_count rendered players have Media Session title and artist metadata"
