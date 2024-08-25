import adapter from 'sveltekit-adapter-deno';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { Float16Array } from '@petamoriken/float16'
// kvdex uses float16array under the hood (doesn't exist in node), filling that in here so it works during dev
globalThis.Float16Array = Float16Array

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			buildOptions: {
				loader: {
					'.node': 'empty'
				}
			}
		})
	}
};

export default config;
