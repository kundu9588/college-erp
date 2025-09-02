@echo off

echo 📊 Git Repository Status
echo ========================
echo.

echo 🌿 Current Branch:
git branch --show-current
echo.

echo 📈 Branch Status:
git status --short
echo.

echo 🔄 Recent Commits:
git log --oneline -5
echo.

echo 🌐 Remote Branches:
git branch -r
