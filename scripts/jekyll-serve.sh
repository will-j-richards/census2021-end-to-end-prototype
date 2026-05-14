#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# Populate gitignored paths (js/compiled, s/img) from committed sources — no separate Gulp step.
if [[ -x "${ROOT}/scripts/sync-static-assets.sh" ]]; then
  "${ROOT}/scripts/sync-static-assets.sh"
fi

PORT="${PORT:-8080}"
HOST="${HOST:-127.0.0.1}"

RUBY=""

ruby_major_version() {
  local rb="$1"
  "$rb" -e 'print RUBY_VERSION.split(".")[0].to_i' 2>/dev/null || echo "99"
}

# Prefer Homebrew versioned Ruby (< 4.0) — plain `brew install ruby` is often 4.x
# and breaks github-pages (= 228) / commonmarker (Ruby < 4.0).
for rb in \
  /opt/homebrew/opt/ruby@3.2/bin/ruby \
  /usr/local/opt/ruby@3.2/bin/ruby \
  /opt/homebrew/opt/ruby@3.3/bin/ruby \
  /usr/local/opt/ruby@3.3/bin/ruby \
  /opt/homebrew/opt/ruby@3.4/bin/ruby \
  /usr/local/opt/ruby@3.4/bin/ruby; do
  if [[ -x "$rb" ]]; then
    RUBY="$rb"
    break
  fi
done

if [[ -z "$RUBY" ]] && command -v ruby >/dev/null 2>&1; then
  _cand="$(command -v ruby)"
  _maj="$(ruby_major_version "$_cand")"
  # github-pages 228 stack needs Ruby < 4.0
  if [[ "$_maj" -lt 4 ]]; then
    RUBY="$_cand"
  fi
fi

if [[ -z "$RUBY" ]]; then
  echo "No usable Ruby found. This project needs Ruby >= 3.0 and < 4.0 (github-pages pin)."
  echo "Install a 3.x keg, then put it first on PATH, for example:"
  echo "  brew install ruby@3.2"
  echo "  export PATH=\"/opt/homebrew/opt/ruby@3.2/bin:\$PATH\""
  exit 1
fi

echo "Using ruby: $RUBY"
echo "Serving on: http://${HOST}:${PORT}"

exec "$RUBY" -S bundle exec jekyll serve \
  -c _config.yml,_config_dev.yml \
  --livereload \
  --host "$HOST" \
  --port "$PORT"
