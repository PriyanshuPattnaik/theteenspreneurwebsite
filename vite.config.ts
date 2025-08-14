import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';

// Plugin to ensure _headers file exists for Netlify adapter
function netlifyHeadersPlugin() {
  return {
    name: 'netlify-headers',
    writeBundle() {
      const headersPath = '.svelte-kit/output/client/_headers';
      const headersDir = dirname(headersPath);
      
      if (!existsSync(headersDir)) {
        mkdirSync(headersDir, { recursive: true });
      }
      
      if (!existsSync(headersPath)) {
        writeFileSync(headersPath, '');
        console.log('Created _headers file for Netlify adapter');
      }
    }
  };
}

export default defineConfig({
  plugins: [sveltekit(), netlifyHeadersPlugin()],
  resolve: {
    alias: {
      '@': '/src',
      '$lib': '/src/lib'
    }
  }
});
