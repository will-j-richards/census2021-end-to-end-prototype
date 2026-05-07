#!/usr/bin/env bash
# Serve the editable mirror/ tree (Netlify snapshot + your edits). Not Jekyll.
# Usage: ./scripts/serve-mirror.sh [PORT]
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${1:-${PORT:-8080}}"
cd "$ROOT/mirror"
echo "Serving mirror/ at http://127.0.0.1:${PORT}/ (Ctrl+C to stop)"
exec python3 -m http.server "$PORT" --bind 127.0.0.1
