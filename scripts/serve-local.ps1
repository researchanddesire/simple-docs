$ErrorActionPreference = "Stop"

Set-Location (Join-Path $PSScriptRoot "..")

if (-not (Test-Path ".\node_modules")) {
    Write-Error "Local environment not found. Run .\scripts\bootstrap.ps1 first."
}

Write-Host "Starting the local docs preview..."
Write-Host "Open http://127.0.0.1:8000 when it is ready."
npm run dev -- --hostname 127.0.0.1 --port 8000
