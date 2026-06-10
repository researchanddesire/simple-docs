$ErrorActionPreference = "Stop"

Set-Location (Join-Path $PSScriptRoot "..")

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js was not found."
    Write-Host "Install Node.js LTS, then run this script again."
    exit 1
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "npm was not found."
    Write-Host "Install Node.js LTS, then run this script again."
    exit 1
}

Write-Host "Installing docs dependencies..."
npm install
Write-Host "Local docs environment is ready."
