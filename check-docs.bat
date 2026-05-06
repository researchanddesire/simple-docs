@echo off
setlocal

cd /d "%~dp0"

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\ensure-docker.ps1"
if errorlevel 1 (
  goto :end
)

echo Checking the docs site...
docker compose run --rm docs mkdocs build --clean --strict
if errorlevel 1 (
  echo.
  echo The docs check did not complete.
  echo If Docker just restarted, wait a few seconds and run the script again.
)

:end
echo.
pause
