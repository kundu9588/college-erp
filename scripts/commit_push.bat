@echo off

REM Check if commit message is provided
if "%~1"=="" (
    echo Usage: commit_push.bat "commit message"
    echo Example: commit_push.bat "feat: add student registration"
    exit /b 1
)

REM Get the full commit message (handles spaces properly)
set "COMMIT_MSG=%~1"

echo 💾 Committing changes with message: %COMMIT_MSG%
echo.

REM Add all changes
git add .
if errorlevel 1 (
    echo ❌ Failed to add changes
    exit /b 1
)

REM Get current branch
for /f "tokens=*" %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i

REM Commit changes
git commit -m "%COMMIT_MSG%"  --no-verify
if errorlevel 1 (
    echo ❌ Failed to commit changes
    exit /b 1
)

REM Push changes
git push -u origin %CURRENT_BRANCH%
if errorlevel 1 (
    echo ❌ Failed to push changes
    exit /b 1
) else (
    echo ✅ Successfully committed and pushed changes!
    echo.
    echo 🔗 Next steps:
    echo    - Run: scripts\create_pr.bat to create pull request
    echo    - Or continue making changes and commit again
)
