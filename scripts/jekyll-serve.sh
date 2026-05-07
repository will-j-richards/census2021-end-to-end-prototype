#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PORT="${PORT:-8080}"
HOST="${HOST:-127.0.0.1}"

RUBY=""

# Prefer Homebrew Ruby if present (Apple Silicon then Intel).
if [[ -x "/opt/homebrew/opt/ruby@3.2/bin/ruby" ]]; then
  RUBY="/opt/homebrew/opt/ruby@3.2/bin/ruby"
elif [[ -x "/usr/local/opt/ruby@3.2/bin/ruby" ]]; then
  RUBY="/usr/local/opt/ruby@3.2/bin/ruby"
elif command -v ruby >/dev/null 2>&1; then
  RUBY="$(command -v ruby)"
fi

if [[ -z "$RUBY" ]]; then
  echo "No ruby found on PATH."
  exit 1
fi

echo "Using ruby: $RUBY"
echo "Serving on: http://${HOST}:${PORT}"

exec "$RUBY" -S bundle exec jekyll serve \
  -c _config.yml,_config_dev.yml \
  --livereload \
  --host "$HOST" \
  --port "$PORT"

