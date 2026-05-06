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
if errorlevel 1 (
  echo.
  echo The docs preview did not start.
  echo If Docker just restarted, wait a few seconds and run the script again.
)

:end
echo.
pause
