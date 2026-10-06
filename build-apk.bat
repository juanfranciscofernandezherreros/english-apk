@echo off
setlocal EnableExtensions EnableDelayedExpansion
cd /d "%~dp0"

echo.
echo ==========================================
echo   Easy English - Android APK Builder
echo ==========================================
echo.

where node >nul 2>nul || (
  echo [ERROR] Node.js is not installed or not in PATH.
  echo Install Node.js and run this script again.
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

echo [1/6] Installing project dependencies...
call npm install
if errorlevel 1 goto :fail

echo.
echo [2/6] Validating 10,000 grammar examples...
call npm run test:grammar
if errorlevel 1 goto :fail

echo.
echo [3/6] Checking Android platform...
if not exist "platforms\android" (
  echo Android platform not found. Adding android@14.0.1...
  call npx cordova@12.0.0 platform add android@14.0.1
  if errorlevel 1 goto :fail
) else (
  echo Android platform already exists.
)

echo.
echo [4/6] Checking Android requirements...
call npx cordova@12.0.0 requirements android
if errorlevel 1 goto :requirements_fail

echo.
echo [5/6] Building debug APK...
call npx cordova@12.0.0 build android
if errorlevel 1 goto :fail

echo.
echo [6/6] Locating APK...
set "APK=%CD%\platforms\android\app\build\outputs\apk\debug\app-debug.apk"

if exist "%APK%" (
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
)

echo [WARNING] Build finished but the expected APK was not found at:
echo %APK%
pause
exit /b 2

:requirements_fail
echo.
echo ==========================================
echo   ANDROID REQUIREMENTS MISSING
echo ==========================================
echo Check JAVA_HOME, ANDROID_HOME, Android SDK,
echo build-tools, platform-tools and JDK 17.
echo.
pause
exit /b 3

:fail
echo.
echo ==========================================
echo   BUILD FAILED
echo ==========================================
echo Review the error messages above.
echo.
pause
exit /b 1
