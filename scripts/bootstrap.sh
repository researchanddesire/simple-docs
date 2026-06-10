#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_DIR"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js was not found." >&2
  echo "Install Node.js LTS, then run this script again." >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm was not found." >&2
  echo "Install Node.js LTS, then run this script again." >&2
  exit 1
fi

echo "Installing docs dependencies..."
npm install
echo "Local docs environment is ready."
