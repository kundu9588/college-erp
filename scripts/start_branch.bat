@echo off

REM Usage: start_branch.bat <branch-type> <module-name>
REM Supports: feat, fix, docs, style, refactor, test, chore, ci

if "%1"=="" (
    echo Usage: start_branch.bat branch-type module-name
    echo.
    echo Branch types:
    echo   feat     - New features
    echo   fix      - Bug fixes
    echo   docs     - Documentation
    echo   style    - Code formatting
    echo   refactor - Code restructuring
    echo   test     - Adding tests
    echo   chore    - Maintenance tasks
    echo   ci       - CI/CD changes
    echo.
    echo Examples:
    echo   start_branch.bat feat student-registration
    echo   start_branch.bat fix login-validation
    echo   start_branch.bat docs api-endpoints
    echo   start_branch.bat test authentication
    exit /b 1
)

if "%2"=="" (
    echo Usage: start_branch.bat branch-type module-name
    echo Example: start_branch.bat feat student-registration
    exit /b 1
)

set BRANCH_TYPE=%1
set MODULE_NAME=%2
set BRANCH_NAME=%BRANCH_TYPE%/%MODULE_NAME%

REM Validate branch type against commitlint rules
set VALID_TYPES=feat fix docs style refactor test chore ci
echo %VALID_TYPES% | findstr /i /w "%BRANCH_TYPE%" >nul
if errorlevel 1 (
    echo ❌ Invalid branch type: %BRANCH_TYPE%
    echo ✅ Valid types: %VALID_TYPES%
    exit /b 1
)

echo 🚀 Starting new %BRANCH_TYPE% branch: %BRANCH_NAME%
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

REM Create new branch
git checkout -b %BRANCH_NAME%
if errorlevel 1 (
    echo ❌ Failed to create branch %BRANCH_NAME%
    exit /b 1
) else (
    echo ✅ Created and switched to branch: %BRANCH_NAME%
    echo.
    echo 📝 Now you can:
    echo    1. Make your changes for %MODULE_NAME%
    echo    2. Run: commit_push.bat "%BRANCH_TYPE%: your commit message"
    echo    3. Run: create_pr.bat
    echo.
    echo 💡 Commit message should start with: %BRANCH_TYPE%:
)
