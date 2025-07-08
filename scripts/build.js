#!/usr/bin/env node

import { execSync } from 'child_process';
import * as fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, '../dist/esm');
const outputFile = path.join(outputDir, 'package.json');
const distPath = path.join(__dirname, '../dist');

console.log('🚀 Building textarea-caret-typescript...');

// Clean dist directory
console.log('🧹 Cleaning dist directory...');
execSync('npm run clean', { stdio: 'inherit' });

// Build CommonJS
console.log('📦 Building CommonJS...');
execSync('npx tsc --project tsconfig.cjs.json', { stdio: 'inherit' });

// Build ES Modules
console.log('📦 Building ES Modules...');
execSync('npx tsc --project tsconfig.esm.json', { stdio: 'inherit' });

// Build TypeScript declarations
console.log('📦 Building TypeScript declarations...');
execSync('npx tsc --project tsconfig.types.json', { stdio: 'inherit' });

// Create package.json for ES modules
const esmPackageJson = {
	type: 'module'
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(esmPackageJson, null, 2));

console.log('✅ Build completed successfully!');

// Verify build outputs
const distFiles = fs.readdirSync(path.join(__dirname, '../dist'));
console.log('📁 Generated files:', distFiles);

// Verify that declaration files exist at the root
const hasDeclarations = fs.existsSync(path.join(distPath, 'index.d.ts'));
console.log('🔍 TypeScript declarations:', hasDeclarations ? '✅ Found' : '❌ Missing');

console.log('\n🎉 Ready for publishing!');
