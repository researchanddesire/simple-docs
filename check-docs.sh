#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

source "$SCRIPT_DIR/scripts/ensure-docker.sh"
ensure_docker_running

echo "Checking the docs site..."
docker compose run --rm docs mkdocs build --clean --strict
