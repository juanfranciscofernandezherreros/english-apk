$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host ""
Write-Host "=========================================="
Write-Host "  EnglishAPK - Android APK Builder"
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

Run-Step "[1/4] Installing project dependencies..." { npm install }
Run-Step "[2/4] Validating 10,000 grammar examples..." { npm run test:grammar }
Run-Step "[3/4] Building EnglishAPK..." { npm run build:android }

$apk = Join-Path $PSScriptRoot "dist/EnglishAPK.apk"

Write-Host ""
Write-Host "[4/4] Verifying EnglishAPK.apk..." -ForegroundColor Cyan

if (-not (Test-Path $apk)) {
    throw "Build finished, but EnglishAPK.apk was not found at $apk"
}

Write-Host ""
Write-Host "=========================================="
Write-Host "  BUILD SUCCESSFUL"
Write-Host "=========================================="
Write-Host "APK:"
Write-Host $apk
Write-Host ""
Start-Process explorer.exe "/select,`"$apk`""
