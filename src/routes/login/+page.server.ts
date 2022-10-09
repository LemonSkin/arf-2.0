import { invalid, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'

import { db } from '$lib/database'
import { doc, getDoc, setDoc } from 'firebase/firestore'

enum Roles {
	ADMIN = 'ADMIN',
	USER = 'USER',
}

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
        throw redirect(302, '/')
    }
}

const register: Action = async ({ request }) => {
	const data = await request.formData();
	const username = data.get('username');
	const password = data.get('password');

	if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
		return invalid(400, { invalid: true });
	}

	const docRef = doc(db, "users", username);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		await setDoc(docRef, {
			password: password,
			role: "user"
		});
		throw redirect(303, '/');
	}
	return invalid(400, {registrationFailed: true});
}

const login: Action = async ({ cookies, request }) => {
	 const data = await request.formData();
	 const username = data.get('username');
	 const password = data.get('password');

	if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
		return invalid(400, { invalid: true });
	}
	
	const docRef = doc(db, "users", username);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists() && docSnap.data()['password'] === password) {
	
		const authToken: string = crypto.randomUUID();
		await setDoc(doc(db, "users", username), {session: authToken}, {merge: true});
		// Create cookie
		cookies.set('session', authToken, {
			// send cookie for every page
			path: '/',
			// server side only cookie so you can't use document.cookie
			httpOnly: true,
			// only requests from same site can send cookies
			sameSite: 'strict',
			// only sent over HTTPS in production
			secure: process.env.NODE_ENV === 'production',
			// one month expiration
			maxAge: 60 * 60 * 24 * 30})

			throw redirect(303, '/');
	}
	return invalid(400, {loginFailed: true});
}

export const actions: Actions = { register, login }