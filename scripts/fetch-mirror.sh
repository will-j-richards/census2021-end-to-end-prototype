#!/usr/bin/env bash
# Download the deployed site into mirror/ (wget). Edit files under mirror/; nothing else deletes them.
# Needs a Jekyll build so we can list page URLs from _site/ (same paths as the deploy).
#
#   ./scripts/fetch-mirror.sh
#   ./scripts/fetch-mirror.sh --no-build
#   SITE_URL=https://your-site.netlify.app ./scripts/fetch-mirror.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
# shellcheck source=resolve-deploy-url.sh
source "$ROOT/scripts/resolve-deploy-url.sh"

NO_BUILD=false
for arg in "$@"; do
  case "$arg" in
    --no-build) NO_BUILD=true ;;
    -h|--help)
      echo "Usage: $0 [--no-build]"
      echo "Downloads your Netlify deploy into mirror/ (overwrites mirror/). Set SITE_URL or site-url."
      exit 0
      ;;
  esac
done

if ! command -v wget >/dev/null 2>&1; then
  echo "wget is required (e.g. brew install wget)" >&2
  exit 1
fi

if [[ "$NO_BUILD" != true ]]; then
  if ! command -v bundle >/dev/null 2>&1; then
    echo "bundle not found; install Ruby/Bundler or run with --no-build" >&2
    exit 1
  fi
  echo "==> Jekyll build (URL list only)"
  bundle exec jekyll build --config _config.yml,_config_dev.yml
fi

if [[ ! -d _site ]]; then
  echo "_site/ missing; run Jekyll build first" >&2
  exit 1
fi

BASE_URL="$(resolve_deploy_url)"
HOST="${BASE_URL#*://}"
HOST="${HOST%%/*}"

URL_FILE="$ROOT/mirror-urls.txt"
echo "==> Writing $URL_FILE"
find "$ROOT/_site" -name index.html \
  ! -path '*/export/*' ! -path '*/mirror/*' \
  | while read -r f; do
  rel="${f#"$ROOT/_site/"}"
  if [[ "$rel" == "index.html" ]]; then
    echo "${BASE_URL}/"
  else
    echo "${BASE_URL}/${rel%/index.html}/"
  fi
done | sort -u > "$URL_FILE"

OUT="$ROOT/mirror"
echo "==> Clearing $OUT (local edits in mirror/ are removed — commit or backup first)"
rm -rf "$OUT"
mkdir -p "$OUT"

DOMAINS="${HOST},celebrated-crumble-f4dccc.netlify.app,cdn.ons.gov.uk,cdnjs.cloudflare.com,fonts.googleapis.com,fonts.gstatic.com,maxcdn.bootstrapcdn.com,deploy-preview-118--sdc-prototypes.netlify.app,deploy-preview-129--sdc-global-design-patterns.netlify.app"

echo "==> Downloading from $BASE_URL into mirror/"
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

echo "==> Syncing mirror/ → export/ (same tree for static hosting)"
EXPORT="$ROOT/export"
rm -rf "$EXPORT"
mkdir -p "$EXPORT"
if command -v rsync >/dev/null 2>&1; then
  rsync -a "${OUT}/" "${EXPORT}/"
else
  cp -R "${OUT}/." "${EXPORT}/"
fi

echo "==> Done. Edit mirror/ or export/ then: ./scripts/serve-mirror.sh or ./scripts/serve-export.sh"
