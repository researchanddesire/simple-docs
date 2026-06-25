#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_DIR"

if ! command -v python3 >/dev/null 2>&1; then
  echo "Python 3 was not found." >&2
  echo "Install Python 3, then run this script again." >&2
  exit 1
fi

if [ ! -x "./.venv/bin/python" ]; then
  echo "Creating the local docs environment..."
  python3 -m venv .venv
  ./.venv/bin/python -m pip install --upgrade pip
fi

echo "Installing docs dependencies..."
./.venv/bin/python -m pip install -r requirements.txt
echo "Local docs environment is ready."
