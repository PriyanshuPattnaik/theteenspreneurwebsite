import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { dirname } from 'path';

const headersPath = '.svelte-kit/output/client/_headers';
const headersDir = dirname(headersPath);

// Create directory if it doesn't exist
if (!existsSync(headersDir)) {
  mkdirSync(headersDir, { recursive: true });
}

// Create empty _headers file if it doesn't exist
if (!existsSync(headersPath)) {
  writeFileSync(headersPath, '');
}

console.log('Prebuild setup complete');