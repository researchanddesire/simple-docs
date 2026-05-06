#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if [ ! -x "./.venv/bin/python" ]; then
  echo "Local docs environment not found yet."
  ./scripts/bootstrap.sh
fi

echo "Checking the docs site..."
if ! ./.venv/bin/python -m mkdocs build --clean --strict; then
  echo "The docs check did not complete." >&2
  echo "If setup was interrupted, run ./scripts/bootstrap.sh and try again." >&2
  exit 1
fi
