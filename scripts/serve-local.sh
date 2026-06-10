#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_DIR"

if [ ! -d "./node_modules" ]; then
  echo "Local environment not found. Run ./scripts/bootstrap.sh first." >&2
  exit 1
fi

echo "Starting the local docs preview..."
echo "Open http://127.0.0.1:8000 when it is ready."
npm run dev -- --hostname 127.0.0.1 --port 8000
