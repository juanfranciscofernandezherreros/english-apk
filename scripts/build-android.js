const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const isWindows = process.platform === "win32";
const release = process.argv.includes("--release");
const variant = release ? "release" : "debug";
const sourceApk = path.join(
  "platforms", "android", "app", "build", "outputs", "apk", variant, "EnglishAPK.apk"
);
const outputDir = "dist";
const outputApk = path.join(outputDir, "EnglishAPK.apk");

function runCordova(args) {
  let result;

  if (isWindows) {
    // Node 24 on Windows can throw EINVAL when spawnSync targets npx.cmd directly.
    // Run the local Cordova CLI through cmd.exe instead.
    const cordovaBin = path.join(process.cwd(), "node_modules", ".bin", "cordova.cmd");
    if (!fs.existsSync(cordovaBin)) {
      throw new Error(`Cordova CLI not found at ${cordovaBin}. Run npm install first.`);
    }

    const command = ['"' + cordovaBin + '"', ...args.map(a => '"' + String(a).replace(/"/g, '\\"') + '"')].join(" ");
    result = spawnSync(process.env.ComSpec || "cmd.exe", ["/d", "/s", "/c", command], {
      stdio: "inherit",
      windowsHide: false
    });
  } else {
    const cordovaBin = path.join(process.cwd(), "node_modules", ".bin", "cordova");
    if (!fs.existsSync(cordovaBin)) {
      throw new Error(`Cordova CLI not found at ${cordovaBin}. Run npm install first.`);
    }

    result = spawnSync(cordovaBin, args, {
      stdio: "inherit",
      shell: false
    });
  }

  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}

if (!fs.existsSync("platforms/android")) {
  console.log("Android platform not found. Adding cordova-android 14.0.1...");
  runCordova(["platform", "add", "android@14.0.1"]);
} else {
  console.log("Android platform already present.");
}

if (!process.env.CI) {
  console.log("Checking Android build requirements...");
  runCordova(["requirements", "android"]);
} else {
  console.log("CI detected: skipping cordova requirements check.");
}

console.log(release ? "Building EnglishAPK release..." : "Building EnglishAPK...");
const args = ["build", "android"];
if (release) args.push("--release");
runCordova(args);

if (!fs.existsSync(sourceApk)) {
  throw new Error(`Build finished, but EnglishAPK.apk was not found at ${sourceApk}`);
}

fs.mkdirSync(outputDir, { recursive: true });
fs.copyFileSync(sourceApk, outputApk);

console.log("");
console.log("BUILD SUCCESSFUL");
console.log(`APK: ${path.resolve(outputApk)}`);
