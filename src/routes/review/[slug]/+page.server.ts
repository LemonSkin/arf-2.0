import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	if (params.slug === 'hello') {
		return {
			title: 'Hello world!',
			content: '<b>Welcome to our blog. Lorem ipsum dolor sit amet...</b>'
		};
	}

	throw error(404, 'Not found');
}
