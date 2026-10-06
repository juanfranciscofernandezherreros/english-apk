const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const release = process.argv.includes("--release");
const variant = release ? "release" : "debug";

const cordovaCli = path.join(
  process.cwd(),
  "node_modules",
  "cordova",
  "bin",
  "cordova"
);

const sourceApk = path.join(
  "platforms",
  "android",
  "app",
  "build",
  "outputs",
  "apk",
  variant,
  "EnglishAPK.apk"
);

const outputDir = path.join(process.cwd(), "dist");
const outputApk = path.join(outputDir, "EnglishAPK.apk");

function runCordova(args) {
  if (!fs.existsSync(cordovaCli)) {
    throw new Error(
      "Cordova CLI not found at " + cordovaCli + ". Run npm install first."
    );
  }

  const result = spawnSync(process.execPath, [cordovaCli, ...args], {
    stdio: "inherit",
    shell: false,
    cwd: process.cwd(),
    env: process.env
  });

  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}

if (!fs.existsSync(path.join("platforms", "android"))) {
  console.log("Android platform not found. Adding cordova-android 14.0.1...");
  runCordova(["platform", "add", "android@14.0.1"]);
} else {
  console.log("Android platform already present.");
}

// Do not run `cordova requirements` here. It can fail for non-build-critical
// reasons (for example avdmanager not being on PATH) even when Gradle can build.
// The real build below is the definitive check.
console.log(release ? "Building EnglishAPK release..." : "Building EnglishAPK...");
const buildArgs = ["build", "android"];
if (release) buildArgs.push("--release");
runCordova(buildArgs);

if (!fs.existsSync(sourceApk)) {
  throw new Error(
    "Build finished, but EnglishAPK.apk was not found at " + sourceApk
  );
}

fs.mkdirSync(outputDir, { recursive: true });
fs.copyFileSync(sourceApk, outputApk);

console.log("");
console.log("==========================================");
console.log("  BUILD SUCCESSFUL");
console.log("==========================================");
console.log("APK:");
console.log(outputApk);
