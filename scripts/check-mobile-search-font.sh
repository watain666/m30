#!/usr/bin/env bash

set -euo pipefail

output_dir="$(mktemp -d)"
trap 'rm -rf "$output_dir"' EXIT

hugo --destination "$output_dir" --cleanDestinationDir --quiet

compiled_css="$(find "$output_dir" -maxdepth 1 -name 'book*.css' -print -quit)"

if [ -z "$compiled_css" ] || ! grep -qF '.book-search input{font-size:16px}' "$compiled_css"; then
  echo 'FAIL: search input lacks a 16px iOS-safe font size' >&2
  exit 1
fi

echo 'PASS: search input has a 16px iOS-safe font size'
