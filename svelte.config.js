// svelte.config.js
import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

export default {
  kit: {
    adapter: adapter({
      // Deploy SSR to standard Netlify Functions (Node runtime)
      edge: false,
      // Keep a single function unless you want to split per route
      split: false
    }),
    alias: {
      $lib: './src/lib'
    }
  },
  preprocess: preprocess({
    typescript: true // Enable TypeScript support
  })
};