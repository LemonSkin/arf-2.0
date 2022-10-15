import { db } from '$lib/database';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { invalid, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';

type Review = {
	presenter?: string;
	project?: string;
	title?: string;
};

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user === undefined) {
		throw redirect(302, '/login');
	}

	// Find all reviews that user is assigned
	const to_review = query(
		collection(db, 'reviews'),
		where('reviewers', 'array-contains', locals.user.name)
	);
	const querySnapshot = await getDocs(to_review);

	const reviewing: Review[] = [];
	querySnapshot.forEach((doc) => {
		reviewing.push(doc.data() as Review);
	});

	return {
		reviewing
	};
};

const review: Action = async ({ request }) => {
	const data = await request.formData();
	const title = data.get('title');
	console.log(title);

	throw redirect(303, '/review/hello');
};

export const actions: Actions = { review };
