$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host ""
Write-Host "=========================================="
Write-Host "  Easy English - Android APK Builder"
Write-Host "=========================================="
Write-Host ""

function Run-Step([string]$Label, [scriptblock]$Action) {
    Write-Host ""
    Write-Host $Label -ForegroundColor Cyan
    & $Action
    if ($LASTEXITCODE -ne 0) {
        throw "Step failed: $Label"
    }
}

foreach ($cmd in @("node","npm","java")) {
    if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) {
        throw "$cmd is not installed or not available in PATH."
    }
}

Run-Step "[1/6] Installing project dependencies..." { npm install }
Run-Step "[2/6] Validating 10,000 grammar examples..." { npm run test:grammar }

if (-not (Test-Path "platforms/android")) {
    Run-Step "[3/6] Adding Android platform..." { npx cordova@12.0.0 platform add android@14.0.1 }
} else {
    Write-Host ""
    Write-Host "[3/6] Android platform already exists." -ForegroundColor Green
}

Run-Step "[4/6] Checking Android requirements..." { npx cordova@12.0.0 requirements android }
Run-Step "[5/6] Building debug APK..." { npx cordova@12.0.0 build android }

$apk = Join-Path $PSScriptRoot "platforms/android/app/build/outputs/apk/debug/app-debug.apk"

Write-Host ""
Write-Host "[6/6] Locating APK..." -ForegroundColor Cyan

if (Test-Path $apk) {
    Write-Host ""
    Write-Host "BUILD SUCCESSFUL" -ForegroundColor Green
    Write-Host $apk
    Start-Process explorer.exe "/select,`"$apk`""
} else {
    throw "Build finished, but APK was not found at $apk"
}
