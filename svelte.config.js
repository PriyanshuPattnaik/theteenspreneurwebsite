// svelte.config.js
import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

export default {
  kit: {
    adapter: adapter({
      edge: false,
      split: false
    }),
    alias: {
      $lib: './src/lib'
    },
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        // Log the error but don't fail the build
        console.warn(`Prerender error on ${path}: ${message}`);
        
        // You can choose to throw an error for specific paths if needed
        // throw new Error(`${status} ${path}`);
      }
    }
  },
  preprocess: preprocess({
    typescript: true // Enable TypeScript support
  })
};