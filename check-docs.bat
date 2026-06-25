@echo off
setlocal

cd /d "%~dp0"

echo Preparing the local docs environment...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\bootstrap.ps1"
if errorlevel 1 (
  goto :end
)

echo Checking the docs site...
powershell -NoProfile -ExecutionPolicy Bypass -Command "& { Set-Location '%~dp0'; .\.venv\Scripts\python.exe -m mkdocs build --clean --strict }"
if errorlevel 1 (
  echo.
  echo The docs check did not complete.
  echo If setup was interrupted, run .\scripts\bootstrap.ps1 and try again.
)

:end
echo.
pause
