#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker was not found." >&2
  echo "Install Docker Desktop or Docker Engine, then try again." >&2
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "Docker Compose is not available." >&2
  echo "Make sure Docker is installed correctly, then try again." >&2
  exit 1
fi

if ! docker info >/dev/null 2>&1; then
  echo "Docker is installed but not running." >&2
  echo "Start Docker Desktop or the Docker service, then try again." >&2
  exit 1
fi

echo "Starting the docs preview..."
echo "Open http://localhost:8000 when the server is ready."
echo "Keep this terminal open while you are writing."

docker compose up --build
