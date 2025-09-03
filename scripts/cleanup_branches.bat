@REM cleanup_branches.bat
@echo off

echo 🧹 Cleaning up merged branches...
echo.

REM Switch to main first
git checkout main

REM Pull latest
git pull origin main

REM Delete merged local branches (except main)
for /f "tokens=*" %%i in ('git branch --merged ^| findstr /v "main"') do (
    echo Deleting merged branch: %%i
    git branch -d %%i
)

REM Clean up remote tracking branches
git remote prune origin

echo ✅ Branch cleanup completed!
