#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if [ ! -d "./node_modules" ]; then
  echo "Local docs environment not found yet."
  ./scripts/bootstrap.sh
fi

echo "Starting the docs preview..."
echo "Open http://localhost:8000 when the server is ready."
echo "Keep this terminal open while you are writing."

if ! ./scripts/serve-local.sh; then
  echo "The docs preview did not start." >&2
  echo "If setup was interrupted, run ./scripts/bootstrap.sh and try again." >&2
  exit 1
fi
