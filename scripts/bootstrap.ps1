$ErrorActionPreference = "Stop"

Set-Location (Join-Path $PSScriptRoot "..")

$pythonCmd = $null
$pythonArgs = @()
if (Get-Command py -ErrorAction SilentlyContinue) {
    $pythonCmd = "py"
    $pythonArgs = @("-3")
} elseif (Get-Command python -ErrorAction SilentlyContinue) {
    $pythonCmd = "python"
}

if (-not $pythonCmd) {
    Write-Host "Python was not found."
    Write-Host "Install Python 3, then run this script again."
    exit 1
}

Write-Host "Creating the local docs environment..."
& $pythonCmd @pythonArgs -m venv .venv
Write-Host "Installing docs dependencies..."
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
Write-Host "Local docs environment is ready."
