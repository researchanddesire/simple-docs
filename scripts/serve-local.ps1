$ErrorActionPreference = "Stop"

if (-not (Test-Path ".\.venv\Scripts\python.exe")) {
    Write-Error "Local environment not found. Run .\scripts\bootstrap.ps1 first."
}

.\.venv\Scripts\python.exe -m mkdocs serve --dev-addr 127.0.0.1:8000
