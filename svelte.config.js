// svelte.config.js
import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import sveltePreprocess from 'svelte-preprocess';

export default {
    kit: {
        adapter: adapter({
            // Ensure no redirects are written to netlify.toml
            edge: false,
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