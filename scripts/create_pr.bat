@echo off

set CURRENT_BRANCH=
for /f "tokens=*" %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i

echo 🔀 Creating pull request for branch: %CURRENT_BRANCH%
echo.

REM Create PR using GitHub CLI
gh pr create --base main --head %CURRENT_BRANCH% --fill
if errorlevel 1 (
    echo ❌ Failed to create pull request
    echo Make sure GitHub CLI is installed and authenticated
    exit /b 1
) else (
    echo ✅ Pull request created successfully!
    echo.
    echo 👀 Next steps:
    echo    - Wait for code review
    echo    - Address any feedback
    echo    - Merge when approved
)
