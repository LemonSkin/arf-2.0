import { invalid, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import { db } from '$lib/database';
import { getDocs, collection, doc, getDoc, setDoc } from 'firebase/firestore';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user === undefined) {
		throw redirect(302, '/login');
	}

	const projects: string[] = [];
	const projectsSnapshot = await getDocs(collection(db, 'projects'));
	projectsSnapshot.forEach((doc) => {
		// projects.push(doc.id);
		projects.push(doc.data()['alias']);
	});

	const categories: string[] = [];
	const categoriesSnapshot = await getDocs(collection(db, 'project_categories'));
	categoriesSnapshot.forEach((doc) => {
		categories.push(doc.id);
	});

	const users: string[] = [];
	const usersSnapshot = await getDocs(collection(db, 'users'));
	usersSnapshot.forEach((doc) => {
		if (doc.data()['alias']) {
			//Push alias to list if it exists
			users.push(doc.data()['alias']);
		} else {
			//Otherwise just push user id
			users.push(doc.id);
		}
	});

	return { projects, categories, users };
};

const submit: Action = async ({ request }) => {
	const data = await request.formData();
	const title = data.get('review_title');
	const project = data.get('project');
	const category = data.get('category');
	const reviewers = data.getAll('reviewers');
	const reviewRoles = data.getAll('roles');
	const files = data.getAll('files');
	const instructions = data.get('instructions');

	const reviewersN: any = [];
	for (let i = 0; i < reviewers.length; i++) {
		reviewersN[i] = { id: reviewers[i], role: reviewRoles[i] };
	}

	const filesN: any = [];
	for (let i = 0; i < files.length; i++) {
		filesN[i] = { id: 'File ' + (i + 1), path: files[i] };
	}

	if (title.length < 3) {
		return invalid(400, { reviewersN, filesN, title, category, project, submissionFailed: true });
	}

	const categoryPath = String('projects/' + project + '/categories/' + category).toLowerCase();
	console.log(categoryPath);
	const categoryRef = doc(db, categoryPath);
	const docSnap = await getDoc(categoryRef);
	let categoryCount = 0;
	// Test if the project has the appropriate type of review category
	if (docSnap.exists()) {
		// Set the category count if category exists
		categoryCount = docSnap.data()['count'];
	} else {
		//Initialise the category to begin accepting reviews
		await setDoc(doc(db, categoryPath), {
			count: categoryCount
		}).catch((error) => {
			return invalid(400, {
				reviewersN,
				filesN,
				title,
				category,
				project,
				instructions,
				submissionFailed: true,
				error: error
			});
		});
	}

	const reviewReference = String(project + '.' + category + '.' + String(++categoryCount));
	const reviewPath = categoryPath + '/reviews';
	const reviewRef = doc(db, reviewPath, reviewReference);
	await setDoc(reviewRef, {
		title: title
	}).catch((error) => {
		return invalid(400, {
			reviewersN,
			filesN,
			title,
			category,
			project,
			instructions,
			submissionFailed: true,
			error: error
		});
	});
	await setDoc(categoryRef, {
		count: categoryCount
	}).catch((error) => {
		return invalid(400, {
			reviewersN,
			filesN,
			title,
			category,
			project,
			instructions,
			submissionFailed: true,
			error: error
		});
	});

	console.log('redirecting...');
	throw redirect(302, '/');
};

export const actions: Actions = { submit };
