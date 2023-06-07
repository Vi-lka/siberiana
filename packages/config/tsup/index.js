const { execSync } = require("child_process");

/** @type {import("tsup").Options} */
const config = {
  splitting: false,
  sourcemap: true,
  dts: true,
  format: ["esm"],
  ignoreWatch: [
    "**/.turbo",
    "**/dist",
    "**/node_modules",
    "**/.DS_STORE",
    "**/.git",
  ],
  async onSuccess() {
    execSync("pnpm tsc --project tsconfig.sourcemap.json");
  },
};

module.exports = { config };
