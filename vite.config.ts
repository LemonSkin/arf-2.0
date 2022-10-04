import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config = {
	plugins: [sveltekit()],
	server: {
		watch: {
			usePolling: true
		}
	}
};
export default config;
