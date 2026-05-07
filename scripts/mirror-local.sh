#!/usr/bin/env bash
# Copy your deployed site into mirror/, serve it locally. Edit files under mirror/.
#
#   ./scripts/mirror-local.sh fetch [--no-build]
#   ./scripts/mirror-local.sh serve [PORT]
#
# Deploy URL: SITE_URL, DEFAULT_DEPLOY_BASE, or site-url (see site-url.example).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cmd="${1:-}"
shift || true
case "$cmd" in
  fetch)
    exec "$ROOT/scripts/fetch-mirror.sh" "$@"
    ;;
  serve)
    exec "$ROOT/scripts/serve-mirror.sh" "$@"
    ;;
  -h|help|"")
    echo "Usage: $0 fetch [--no-build]   # wget deploy → mirror/"
    echo "       $0 serve [PORT]         # serve mirror/ (default 8080)"
    exit 0
    ;;
  *)
    echo "Unknown command: $cmd (use fetch or serve)" >&2
    exit 1
    ;;
esac
