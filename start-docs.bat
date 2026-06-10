@echo off
setlocal

cd /d "%~dp0"

if not exist ".\node_modules" (
  echo Local docs environment not found yet.
  powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\bootstrap.ps1"
  if errorlevel 1 (
    goto :end
  )
)

echo Starting the docs preview...
echo Open http://localhost:8000 when the server is ready.
echo Keep this window open while you are writing.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\serve-local.ps1"
if errorlevel 1 (
  echo.
  echo The docs preview did not start.
  echo If setup was interrupted, run .\scripts\bootstrap.ps1 and try again.
)

:end
echo.
pause
