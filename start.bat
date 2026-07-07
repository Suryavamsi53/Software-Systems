@echo off
cd /d %~dp0
echo Starting Amazon SDE Prep Server...

:: Try 'python' command
python --version >nul 2>&1
if %errorlevel% equ 0 (
    python serve.py
    goto :eof
)

:: Try 'py' launcher (common on Windows)
py --version >nul 2>&1
if %errorlevel% equ 0 (
    py serve.py
    goto :eof
)

:: Try 'python3'
python3 --version >nul 2>&1
if %errorlevel% equ 0 (
    python3 serve.py
    goto :eof
)

echo.
echo ❌ Error: Python not found!
echo Please install Python from https://python.org
echo.
pause