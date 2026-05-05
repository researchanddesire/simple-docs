#!/usr/bin/env bash
set -euo pipefail

if [ ! -x "./.venv/bin/python" ]; then
  echo "Local environment not found. Run ./scripts/bootstrap.sh first." >&2
  exit 1
fi

./.venv/bin/python -m mkdocs serve --dev-addr 127.0.0.1:8000
