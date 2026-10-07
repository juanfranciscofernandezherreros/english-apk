@echo off
setlocal EnableExtensions
cd /d "%~dp0"

echo.
echo ==========================================
echo   EnglishAPK - Android APK Builder
echo ==========================================
echo.

where node >nul 2>nul || (
  echo [ERROR] Node.js is not installed or not in PATH.
  pause
  exit /b 1
)

where npm >nul 2>nul || (
  echo [ERROR] npm is not available.
  pause
  exit /b 1
)

where java >nul 2>nul || (
  echo [ERROR] Java is not installed or not in PATH.
  echo Cordova Android 14 requires JDK 17.
  pause
  exit /b 1
)

echo [1/3] Installing project dependencies...
call npm install
if errorlevel 1 goto :fail

echo.
echo [2/3] Building EnglishAPK...
call npm run build:android
if errorlevel 1 goto :fail

echo.
echo [3/3] Verifying EnglishAPK.apk...
set "APK=%CD%\dist\EnglishAPK.apk"

if not exist "%APK%" (
  echo [ERROR] EnglishAPK.apk was not found:
  echo %APK%
  pause
  exit /b 2
)

echo.
echo ==========================================
echo   BUILD SUCCESSFUL
echo ==========================================
echo APK:
echo %APK%
echo.
explorer /select,"%APK%"
pause
exit /b 0

:fail
echo.
echo ==========================================
echo   BUILD FAILED
echo ==========================================
echo Review the error messages above.
echo.
pause
exit /b 1
