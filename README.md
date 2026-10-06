# EnglishAPK

A book-style offline English learning app for Android.

## Features

- 10,000 grammar examples.
- 25 grammar chapters.
- Levels A1, A2, B1, B2 and C1.
- Book-style interface inspired by the Easy English blog.
- English-first interface.
- Optional Spanish support inside example cards.
- Search by English, Spanish, grammar topic or level.
- Saved favourites stored locally on the device.
- Random practice mode.
- Fully offline after installation.

## Grammar chapters

### A1
Present Simple, Present Continuous, Past Simple, Future with will, Can / Can't.

### A2
Past Continuous, Present Perfect, Going to, Must / Have to, Should / Shouldn't.

### B1
Comparatives & Superlatives, First Conditional, Second Conditional, Passive Voice, Relative Clauses.

### B2
Gerunds & Infinitives, Third Conditional, Reported Speech, Wish / If only, Modal Deduction.

### C1
Mixed Conditionals, Inversion, Cleft Sentences, Advanced Modals, Participle Clauses.

Each chapter contains 400 examples: **25 × 400 = 10,000 phrases**.

## Build

```bash
npm install
npm run test:grammar
npm run build:android
```

The Android APK is generated directly as:

```
platforms/android/app/build/outputs/apk/debug/EnglishAPK.apk
```

The build script also places the final distributable file at:

```
dist/EnglishAPK.apk
```

GitHub Actions builds and publishes `EnglishAPK.apk` automatically on pushes to `main`.

## App structure

- `www/index.html` — full app interface.
- `www/data/a1.json` … `www/data/c1.json` — 10,000 offline grammar questions stored as JSON.
- `scripts/validate-grammar.js` — validates the corpus.
- `config.xml` — Cordova Android configuration.
- `.github/workflows/build-android.yml` — automatic APK build.

Design inspired by: https://jnfz92.github.io/


## One-click Windows build

From File Explorer or CMD, run:

```bat
build-apk.bat
```

Or from PowerShell:

```powershell
./build-apk.ps1
```

The script installs dependencies, validates the 10,000-example corpus, builds `EnglishAPK.apk`, verifies the final filename, and opens its location automatically.


## JSON question bank

Questions are loaded from local JSON files at runtime:

- `www/data/a1.json`
- `www/data/a2.json`
- `www/data/b1.json`
- `www/data/b2.json`
- `www/data/c1.json`

Each file contains 2,000 entries. The app does not generate grammar questions in JavaScript anymore.
