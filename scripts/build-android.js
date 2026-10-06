const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const isWindows = process.platform === "win32";
const npx = isWindows ? "npx.cmd" : "npx";
const release = process.argv.includes("--release");
const variant = release ? "release" : "debug";
const sourceName = release ? "app-release-unsigned.apk" : "app-debug.apk";
const sourceApk = path.join(
  "platforms", "android", "app", "build", "outputs", "apk", variant, sourceName
);
const outputDir = path.join("dist");
const outputApk = path.join(outputDir, `EnglishAPK-${variant}.apk`);

function run(args) {
  const result = spawnSync(npx, args, { stdio: "inherit", shell: false });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}

if (!fs.existsSync("platforms/android")) {
  console.log("Android platform not found. Adding cordova-android 14.0.1...");
  run(["cordova", "platform", "add", "android@14.0.1"]);
} else {
  console.log("Android platform already present.");
}

console.log("Checking Android build requirements...");
run(["cordova", "requirements", "android"]);

console.log(release ? "Building Android release..." : "Building Android debug APK...");
const args = ["cordova", "build", "android"];
if (release) args.push("--release");
run(args);

if (!fs.existsSync(sourceApk)) {
  throw new Error(`Build finished, but APK was not found at ${sourceApk}`);
}

fs.mkdirSync(outputDir, { recursive: true });
fs.copyFileSync(sourceApk, outputApk);

console.log("");
console.log("BUILD SUCCESSFUL");
console.log(`APK: ${path.resolve(outputApk)}`);
