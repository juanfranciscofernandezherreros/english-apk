# Easy English · Educational Android App

A custom offline English-learning app for Android focused on **theory + examples + guided practice**.

## Educational approach

The app is no longer designed as a 10,000-question grammar exam. It is structured as a small course:

1. Read a clear explanation in Spanish.
2. Study bilingual examples.
3. Review structures, time markers and common mistakes.
4. Practise the exact topic.
5. Read an explanation after every answer.
6. Use **Tense Trainer** for mixed verb-tense practice.

## Main course: verb tenses

- Verb tense overview
- Present Simple
- Present Continuous
- Present Perfect
- Present Perfect Continuous
- Present tense comparisons
- Past Simple
- Past Continuous
- Past Perfect
- Past Perfect Continuous
- Future with will
- Going to
- Present Continuous for future arrangements
- Present Simple for timetables
- Future Continuous
- Future Perfect
- Present Perfect vs Past Simple
- Never vs yet
- Stative verbs
- Mixed-tense trainer

## Additional learning areas

### Grammar
- Essential modal verbs
- Conditionals

### Vocabulary
- Useful phrasal verbs
- Environment and pollution

### Speaking
- Giving opinions
- Polite disagreement
- Useful discourse markers

The structure is intentionally content-driven so additional Easy English blog lessons can be added without rebuilding the learning model.

## Practice design

Questions are handcrafted around the lesson content rather than generated only from a large phrase bank. Current exercise styles include:

- choose the correct tense;
- complete a sentence;
- distinguish similar tenses;
- identify common mistakes;
- vocabulary in context;
- meaning and usage questions;
- immediate answer explanations.

## Offline

All lesson and practice content used by the app is bundled inside the APK and works offline.

## Source material

Educational material is adapted from the Easy English blog:

https://jnfz92.github.io/

Important source articles include the guides to present, past and future tenses, Present Perfect vs Past Simple, never vs yet, future plans and stative verbs.

## Build

```bash
npm install
npm run build:android
```

The Android APK is generated at:

```
platforms/android/app/build/outputs/apk/debug/EnglishAPK.apk
```

The build script also copies the distributable APK to:

```
dist/EnglishAPK.apk
```

GitHub Actions builds the Android package on pushes to `main`.

## Main files

- `www/index.html` — educational course UI, lesson content and practice engine.
- `www/img/logo.svg` — app logo.
- `config.xml` — Cordova Android configuration.
- `.github/workflows/build-android.yml` — Android build workflow.

## Legacy question bank

The older JSON question bank remains in the repository for now, but the redesigned app does **not** load it at runtime. It can be removed later after the educational course version has been validated on-device.
