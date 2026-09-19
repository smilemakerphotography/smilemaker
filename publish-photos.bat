@echo off
setlocal
title Smile Maker - Publish photos
cd /d "%~dp0"

echo.
echo  ============================================
echo   Smile Maker Photography - Publish photos
echo  ============================================
echo.
echo  1. Put your photos into the right folder:
echo       src\images\hero        (homepage slideshow)
echo       src\images\wedding     src\images\model
echo       src\images\portfolio   src\images\outdoor
echo       src\images\baby
echo     (cover.jpg in a service folder = the card image)
echo  2. Then run this file. That's it.
echo.

where git >nul 2>nul
if errorlevel 1 (
    echo  [ERROR] Git is not installed. Get it from https://git-scm.com/download/win
    goto :end
)

echo  Getting the latest version from GitHub...
git pull --ff-only origin main >nul 2>nul
if errorlevel 1 (
    echo  [WARNING] Could not pull the latest changes. Continuing anyway.
)

git add -A src\images
git diff --cached --quiet
if not errorlevel 1 (
    echo.
    echo  No new or removed photos found in src\images. Nothing to publish.
    goto :end
)

echo.
echo  Changes to publish:
git diff --cached --name-status src\images
echo.

set /p CONFIRM= Publish these to the website? [Y/N]:
if /i not "%CONFIRM%"=="Y" (
    git reset -q
    echo  Cancelled. Nothing was published.
    goto :end
)

git commit -q -m "Update photos" >nul
git push origin main
if errorlevel 1 (
    echo.
    echo  [ERROR] Could not upload to GitHub. Check your internet / GitHub login and try again.
    goto :end
)

echo.
echo  Uploaded! The website rebuilds itself in about 3 minutes.
echo  Progress: https://github.com/smilemakerphotography/smilemaker/actions
echo  Website : https://smilemakerphotography.github.io/smilemaker/
start "" "https://github.com/smilemakerphotography/smilemaker/actions"

:end
echo.
pause
