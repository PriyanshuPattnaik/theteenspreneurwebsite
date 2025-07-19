// svelte.config.js
import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import sveltePreprocess from 'svelte-preprocess';

export default {
    kit: {
        adapter: adapter(),
        alias: {
            $lib: './src/lib'
        }
    },
    preprocess: preprocess({
        typescript: true // Enable TypeScript support
    })
};