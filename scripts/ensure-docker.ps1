$ErrorActionPreference = "Stop"

function Test-DockerReady {
    try {
        docker info *> $null
        return $LASTEXITCODE -eq 0
    }
    catch {
        return $false
    }
}

function Get-DockerDesktopPath {
    $candidates = @(
        (Join-Path $env:ProgramFiles "Docker\Docker\Docker Desktop.exe"),
        (Join-Path $env:LocalAppData "Programs\Docker\Docker\Docker Desktop.exe"),
        (Join-Path $env:LocalAppData "Docker\Docker Desktop.exe")
    )

    foreach ($candidate in $candidates) {
        if ($candidate -and (Test-Path $candidate)) {
            return $candidate
        }
    }

    return $null
}

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "Docker was not found."
    Write-Host "Install Docker Desktop, then try again."
    exit 1
}

docker compose version *> $null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Docker Compose is not available."
    Write-Host "Make sure Docker is installed correctly, then try again."
    exit 1
}

if (Test-DockerReady) {
    exit 0
}

Write-Host "Docker is installed but not running. Trying to start it..."

$dockerDesktop = Get-DockerDesktopPath
if (-not $dockerDesktop) {
    Write-Host "Docker Desktop is installed but the launcher could not be found."
    Write-Host "Start Docker manually, then try again."
    exit 1
}

try {
    Start-Process -FilePath $dockerDesktop | Out-Null
}
catch {
    Write-Host "Docker Desktop could not be started automatically."
    Write-Host "Start Docker manually, then try again."
    exit 1
}

Write-Host "Waiting for Docker to finish starting..."

for ($attempt = 1; $attempt -le 45; $attempt++) {
    if (Test-DockerReady) {
        Write-Host "Docker is ready."
        exit 0
    }

    Start-Sleep -Seconds 2
}

Write-Host "Docker did not finish starting automatically."
Write-Host "Open Docker Desktop, wait for it to say it is running, then try again."
exit 1
