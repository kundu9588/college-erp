@REM start_feature.bat
@echo off
if "%1"=="" (
    echo Usage: start_feat.bat module-name
    echo Example: start_feat.bat student-registration
    exit /b 1
)
call start_branch.bat feat %1
