#!/usr/bin/env bash
# Serve export/ (exact copy of _site/ after ./scripts/update-export.sh). Edit Jekyll sources, then re-run that script.
# Usage: ./scripts/serve-export.sh [PORT]
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${1:-${PORT:-8080}}"
cd "$ROOT/export"
echo "Serving export/ at http://127.0.0.1:${PORT}/ (Ctrl+C to stop)"
exec python3 -m http.server "$PORT" --bind 127.0.0.1
