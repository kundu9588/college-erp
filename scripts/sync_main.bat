@REM sync_main.bat
@echo off

echo 🔄 Syncing with main branch...
echo.

REM Switch to main
git checkout main
if errorlevel 1 (
    echo ❌ Failed to switch to main branch
    exit /b 1
)

REM Pull latest changes
git pull origin main
if errorlevel 1 (
    echo ❌ Failed to pull latest changes
    exit /b 1
) else (
    echo ✅ Successfully synced with main branch!
    echo.
    echo 📋 Current branches:
    git branch -a
)
