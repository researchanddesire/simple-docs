#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

source "$SCRIPT_DIR/scripts/ensure-docker.sh"
ensure_docker_running

echo "Starting the docs preview..."
echo "Open http://localhost:8000 when the server is ready."
echo "Keep this terminal open while you are writing."

docker compose up --build
