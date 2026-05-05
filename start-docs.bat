@echo off
setlocal

cd /d "%~dp0"

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\ensure-docker.ps1"
if errorlevel 1 (
  goto :end
)

echo Starting the docs preview...
echo Open http://localhost:8000 when the server is ready.
echo Keep this window open while you are writing.
docker compose up --build

:end
echo.
pause
