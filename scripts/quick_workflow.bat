@REM quick_workflow.bat
@echo off

if "%1"=="" (
    echo Usage: quick_workflow.bat type BRANCH_NAME "commit message"
    echo Example: quick_workflow.bat feat student-auth "feat: add student authentication"
    exit /b 1
)

if "%2"=="" (
    echo Usage: quick_workflow.bat type BRANCH_NAME "commit message"
    echo Example: quick_workflow.bat feat student-auth "feat: add student authentication"
    exit /b 1
)

set FEATURE_NAME=%1
set BRANCH_NAME=%2
set COMMIT_MSG=%3

echo 🚀 Starting complete workflow for feature: %FEATURE_NAME%
echo.

REM Start feature branch
call start_branch.bat %FEATURE_NAME%  %BRANCH_NAME%  
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
