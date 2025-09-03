@echo off
REM Check if working directory is clean (no unstaged or uncommitted changes)
git status --porcelain >nul 2>&1
if not errorlevel 1 (
    git status --porcelain | findstr /r /c:"."
    if not errorlevel 1 (
        echo ❌ Working directory not clean. Please commit or stash changes.
        exit /b 1
    )
)
echo ✅ Working directory clean.
exit /b 0
