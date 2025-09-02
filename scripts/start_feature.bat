@echo off
if "%1"=="" (
    echo Usage: start_feature.bat feature-name
    echo Example: start_feature.bat student-registration
    exit /b 1
)

set FEATURE_BRANCH=feature/%1

echo 🚀 Starting new feature: %FEATURE_BRANCH%
echo.

REM Switch to main and pull latest
git checkout main
if errorlevel 1 (
    echo ❌ Failed to switch to main branch
    exit /b 1
)

git pull origin main
if errorlevel 1 (
    echo ❌ Failed to pull latest main
    exit /b 1
)

REM Create new feature branch
git checkout -b %FEATURE_BRANCH%
if errorlevel 1 (
    echo ❌ Failed to create branch %FEATURE_BRANCH%
    exit /b 1
) else (
    echo ✅ Created and switched to branch: %FEATURE_BRANCH%
    echo.
    echo 📝 Now you can:
    echo    1. Make your changes
    echo    2. Run: commit_push.bat "your commit message"
    echo    3. Run: create_pr.bat
)
