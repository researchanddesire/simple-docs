$ErrorActionPreference = "Stop"

Set-Location (Join-Path $PSScriptRoot "..")

if (-not (Test-Path ".\.venv\Scripts\python.exe")) {
    Write-Error "Local environment not found. Run .\scripts\bootstrap.ps1 first."
}

Write-Host "Starting the local docs preview..."
Write-Host "Open http://127.0.0.1:8000 when it is ready."
.\.venv\Scripts\python.exe -m mkdocs serve --dev-addr 127.0.0.1:8000
