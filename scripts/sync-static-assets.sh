#!/usr/bin/env bash
# Copies assets into paths Jekyll serves without running Gulp (Gulp 3 breaks on Node 22+).
# Mirrors: gulp "img" (_img → s/img), "fonts" (_fonts → s/fonts), and the committed export bundle.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ -f export/js/compiled/end-to-end/bundle.js ]]; then
  mkdir -p js/compiled/end-to-end
  cp -f export/js/compiled/end-to-end/bundle.js js/compiled/end-to-end/bundle.js
  echo "OK: js/compiled/end-to-end/bundle.js (from export/)"
else
  echo "Missing: export/js/compiled/end-to-end/bundle.js — run Gulp on Node 20 or restore export/." >&2
  exit 1
fi

if [[ -d _img ]]; then
  mkdir -p s/img
  # Same as gulp task `img`: _img/**/* → s/img/
  cp -R _img/. s/img/
  echo "OK: s/img/ (from _img/)"
else
  echo "WARN: _img/ not found; skipping s/img" >&2
fi

if [[ -d _fonts ]]; then
  mkdir -p s/fonts
  cp -R _fonts/. s/fonts/
  echo "OK: s/fonts/ (from _fonts/)"
else
  echo "Note: no _fonts/ directory (optional)."
fi

hero_s="_img/small/woman-in-purple-dress-shirt.jpg"
hero_l="_img/large/woman-in-purple-dress-shirt.jpg"
if [[ ! -f "$hero_s" || ! -f "$hero_l" ]]; then
  echo "WARN: Hero images for home.html are not in the repo. Add:" >&2
  echo "  $hero_s" >&2
  echo "  $hero_l" >&2
  echo "  (then re-run this script or cp _img → s/img again)" >&2
fi
