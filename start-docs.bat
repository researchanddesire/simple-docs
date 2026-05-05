@echo off
setlocal

cd /d "%~dp0"

where docker >nul 2>nul
if errorlevel 1 (
  echo Docker was not found.
  echo Install Docker Desktop, then try again.
  goto :end
)

docker compose version >nul 2>nul
if errorlevel 1 (
  echo Docker Compose is not available.
  echo Make sure Docker is installed correctly, then try again.
  goto :end
)

docker info >nul 2>nul
if errorlevel 1 (
  echo Docker is installed but not running.
  echo Start Docker Desktop or the Docker service, then try again.
  goto :end
)

echo Starting the docs preview...
echo Open http://localhost:8000 when the server is ready.
echo Keep this window open while you are writing.
docker compose up --build

:end
echo.
pause
