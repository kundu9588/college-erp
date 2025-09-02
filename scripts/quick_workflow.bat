@echo off

if "%1"=="" (
    echo Usage: quick_workflow.bat feature-name "commit message"
    echo Example: quick_workflow.bat student-auth "feat: add student authentication"
    exit /b 1
)

if "%2"=="" (
    echo Usage: quick_workflow.bat feature-name "commit message"
    echo Example: quick_workflow.bat student-auth "feat: add student authentication"
    exit /b 1
)

set FEATURE_NAME=%1
set COMMIT_MSG=%2

echo 🚀 Starting complete workflow for feature: %FEATURE_NAME%
echo.

REM Start feature branch
call start_feature.bat %FEATURE_NAME%
if errorlevel 1 exit /b 1

echo.
echo ⏸️  PAUSED: Make your code changes now, then press any key to continue...
pause >nul

REM Commit and push
call commit_push.bat %COMMIT_MSG%
if errorlevel 1 exit /b 1

echo.
echo 🔗 Creating pull request...
call create_pr.bat

echo.
echo 🎉 Workflow completed! Your PR is ready for review.
