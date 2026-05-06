#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_DIR"

if [ ! -x "./.venv/bin/python" ]; then
  echo "Local environment not found. Run ./scripts/bootstrap.sh first." >&2
  exit 1
fi

echo "Starting the local docs preview..."
echo "Open http://127.0.0.1:8000 when it is ready."
./.venv/bin/python -m mkdocs serve --dev-addr 127.0.0.1:8000
