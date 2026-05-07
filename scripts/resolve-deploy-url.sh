# shellcheck shell=bash
# Usage: ROOT=/path/to/repo source "$(dirname "$0")/resolve-deploy-url.sh"
#        base="$(resolve_deploy_url)" || exit 1
#
# Order: SITE_URL, DEFAULT_DEPLOY_BASE, site-url file, then pinned prototype deploy (Netlify).
resolve_deploy_url() {
  if [[ -n "${SITE_URL:-}" ]]; then
    echo "${SITE_URL%/}"
    return 0
  fi
  if [[ -n "${DEFAULT_DEPLOY_BASE:-}" ]]; then
    echo "${DEFAULT_DEPLOY_BASE%/}"
    return 0
  fi
  local f="${ROOT}/site-url"
  if [[ -f "$f" ]]; then
    local line
    line="$(head -n 1 "$f" | sed 's/#.*$//' | tr -d '\r')"
    line="${line#"${line%%[![:space:]]*}"}"
    line="${line%"${line##*[![:space:]]}"}"
    if [[ -n "$line" ]]; then
      echo "${line%/}"
      return 0
    fi
  fi
  echo "https://warm-rabanadas-f63732.netlify.app"
  return 0
}
