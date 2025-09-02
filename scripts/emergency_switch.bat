@echo off

if "%1"=="" (
    echo Usage: emergency_switch.bat branch-name
    echo This will stash current work and switch to specified branch
    exit /b 1
)

set TARGET_BRANCH=%1

echo 🚨 Emergency branch switch to: %TARGET_BRANCH%
echo.

echo 💾 Stashing current work...
git stash push -m "Emergency stash before switching to %TARGET_BRANCH%"

echo 🔄 Switching to %TARGET_BRANCH%...
git checkout %TARGET_BRANCH%

if errorlevel 1 (
    echo ❌ Failed to switch to %TARGET_BRANCH%
    echo 🔙 Restoring stashed work...
    git stash pop
) else (
    echo ✅ Successfully switched to %TARGET_BRANCH%
    echo.
    echo 💡 To restore your previous work later:
    echo    1. Switch back to your working branch
    echo    2. Run: git stash pop
)
