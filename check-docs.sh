#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

source "$SCRIPT_DIR/scripts/ensure-docker.sh"
ensure_docker_running

echo "Checking the docs site..."
if ! docker compose run --rm docs mkdocs build --clean --strict; then
  echo "The docs check did not complete." >&2
  echo "If Docker just restarted, wait a few seconds and run the script again." >&2
  exit 1
fi
