#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Building textarea-caret-position...");

// Clean dist directory
console.log("🧹 Cleaning dist directory...");
execSync("npm run clean", { stdio: "inherit" });

// Build CommonJS
console.log("📦 Building CommonJS...");
execSync("npx tsc --project tsconfig.cjs.json", { stdio: "inherit" });

// Build ES Modules
console.log("📦 Building ES Modules...");
execSync("npx tsc --project tsconfig.esm.json", { stdio: "inherit" });

// Build TypeScript declarations
console.log("📦 Building TypeScript declarations...");
execSync("npx tsc --project tsconfig.types.json", { stdio: "inherit" });

// Create package.json for ES modules
const esmPackageJson = {
	type: "module",
};

fs.writeFileSync(path.join(__dirname, "../dist/esm/package.json"), JSON.stringify(esmPackageJson, null, 2));

console.log("✅ Build completed successfully!");

// Verify build outputs
const distFiles = fs.readdirSync(path.join(__dirname, "../dist"));
console.log("📁 Generated files:", distFiles);

console.log("\n🎉 Ready for publishing!");
