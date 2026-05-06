$ErrorActionPreference = "Stop"

Set-Location (Join-Path $PSScriptRoot "..")

if (-not (Get-Command py -ErrorAction SilentlyContinue)) {
    Write-Host "Python was not found."
    Write-Host "Install Python 3, then run this script again."
    exit 1
}

Write-Host "Creating the local docs environment..."
py -3 -m venv .venv
Write-Host "Installing docs dependencies..."
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
Write-Host "Local docs environment is ready."
