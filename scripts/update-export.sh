#!/usr/bin/env bash
# Make export/ an exact copy of the Jekyll output in _site/ (same build = same files).
#
# Day-to-day:
#   1. Edit Jekyll sources (or run jekyll serve).
#   2. ./scripts/update-export.sh
#   3. ./scripts/serve-export.sh
#
# Optional --from-remote: wget into export/ (same as a one-off deploy grab). For an editable
# Netlify snapshot use ./scripts/fetch-mirror.sh → mirror/ (never touched by this script’s default).
#
# Usage:
#   ./scripts/update-export.sh
#   ./scripts/update-export.sh --no-build
#   ./scripts/update-export.sh --from-remote   # needs SITE_URL, site-url, or DEFAULT_DEPLOY_BASE
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
# shellcheck source=resolve-deploy-url.sh
source "$ROOT/scripts/resolve-deploy-url.sh"

NO_BUILD=false
FROM_REMOTE=false
for arg in "$@"; do
  case "$arg" in
    --no-build) NO_BUILD=true ;;
    --from-remote) FROM_REMOTE=true ;;
    -h|--help)
      echo "Usage: $0 [--no-build] [--from-remote]"
      echo ""
      echo "Default: Jekyll build (unless --no-build), then copy _site/ → export/ exactly."
      echo "--from-remote: download via wget (SITE_URL, site-url, or DEFAULT_DEPLOY_BASE)."
      exit 0
      ;;
  esac
done

OUT="$ROOT/export"
URL_FILE="$ROOT/export-urls.txt"

sync_from_jekyll() {
  if [[ ! -d _site ]]; then
    echo "_site/ missing; run Jekyll build first" >&2
    exit 1
  fi
  echo "==> Syncing _site/ → export/ (exact copy)"
  rm -rf "$OUT"
  mkdir -p "$OUT"
  if command -v rsync >/dev/null 2>&1; then
    rsync -a "${ROOT}/_site/" "${OUT}/"
  else
    cp -R "${ROOT}/_site/." "${OUT}/"
  fi
  echo "==> Writing $URL_FILE (paths under export/)"
  find "$OUT" -name index.html \
    ! -path '*/export/*' \
    | while read -r f; do
    rel="${f#"$OUT/"}"
    if [[ "$rel" == "index.html" ]]; then
      echo "/"
    else
      echo "/${rel%/index.html}/"
    fi
  done | sort -u > "$URL_FILE"
}

download_remote() {
  local BASE_URL="$1"
  local HOST="${BASE_URL#*://}"
  HOST="${HOST%%/*}"

  if ! command -v wget >/dev/null 2>&1; then
    echo "wget is required for --from-remote (e.g. brew install wget)" >&2
    exit 1
  fi

  if [[ ! -d _site ]]; then
    echo "_site/ missing; run Jekyll build first (needed for URL list)" >&2
    exit 1
  fi

  echo "==> Writing $URL_FILE (pages from _site → $BASE_URL)"
  find "$ROOT/_site" -name index.html \
    ! -path '*/export/*' \
    | while read -r f; do
    rel="${f#"$ROOT/_site/"}"
    if [[ "$rel" == "index.html" ]]; then
      echo "${BASE_URL}/"
    else
      echo "${BASE_URL}/${rel%/index.html}/"
    fi
  done | sort -u > "$URL_FILE"

  echo "==> Clearing $OUT"
  rm -rf "$OUT"
  mkdir -p "$OUT"

  local DOMAINS="${HOST},celebrated-crumble-f4dccc.netlify.app,cdn.ons.gov.uk,cdnjs.cloudflare.com,fonts.googleapis.com,fonts.gstatic.com,maxcdn.bootstrapcdn.com,deploy-preview-118--sdc-prototypes.netlify.app,deploy-preview-129--sdc-global-design-patterns.netlify.app"

  echo "==> Downloading from $BASE_URL (may take a few minutes)"
  wget -i "$URL_FILE" \
    --directory-prefix="$OUT" \
    --page-requisites \
    --convert-links \
    --adjust-extension \
    --continue \
    -e robots=off \
    --span-hosts \
    --domains="$DOMAINS" \
    --timeout=30 \
    --tries=3 \
    --waitretry=2 \
    -nH \
    --cut-dirs=0
}

if [[ "$FROM_REMOTE" == true ]]; then
  BASE_URL="$(resolve_deploy_url)"
  echo "==> Deploy base: $BASE_URL"
  if [[ "$NO_BUILD" != true ]]; then
    if ! command -v bundle >/dev/null 2>&1; then
      echo "bundle not found; install Ruby/Bundler or run with --no-build" >&2
      exit 1
    fi
    echo "==> Jekyll build (for URL list)"
    bundle exec jekyll build --config _config.yml,_config_dev.yml
  fi
  download_remote "$BASE_URL"
else
  if [[ "$NO_BUILD" != true ]]; then
    if ! command -v bundle >/dev/null 2>&1; then
      echo "bundle not found; install Ruby/Bundler or run with --no-build" >&2
      exit 1
    fi
    echo "==> Jekyll build"
    bundle exec jekyll build --config _config.yml,_config_dev.yml
  fi
  sync_from_jekyll
fi

echo "==> Done."
echo "    ./scripts/serve-export.sh"
echo "    open http://127.0.0.1:8080/"
