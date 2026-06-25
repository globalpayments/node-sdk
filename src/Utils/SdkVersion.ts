import * as fs from "fs";

export function getSdkVersion(): string | null {
  if (process.env.SDK_TESTING === "true") {
    return "";
  }

  if (process.env.npm_package_version) {
    return process.env.npm_package_version;
  }

  try {
    const filename = __dirname + "/../../../package.json";
    if (fs.existsSync(filename)) {
      const packageJson = JSON.parse(fs.readFileSync(filename).toString());
      return packageJson.version || null;
    }
  } catch {
    // ignore
  }

  return null;
}
