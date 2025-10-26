#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Copy dist/index.html to dist/404.html so GitHub Pages will serve the SPA
// for deep-linked routes (prevents 404 on reload).
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');
const notFoundPath = path.join(distDir, '404.html');

if (!fs.existsSync(distDir)) {
  console.error('dist directory not found. Run `npm run build` first.');
  process.exit(1);
}

try {
  fs.copyFileSync(indexPath, notFoundPath);
  console.log('Copied index.html -> 404.html');
} catch (err) {
  console.error('Failed to copy index.html to 404.html:', err);
  process.exit(1);
}
