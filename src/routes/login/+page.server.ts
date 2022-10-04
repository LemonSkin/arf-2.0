import { invalid, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'

import { login_user, register_user } from '$lib/database'

enum Roles {
	ADMIN = 'ADMIN',
	USER = 'USER',
}

export const load: PageServerLoad = async () => {
	// TODO
}

const register: Action = async ({ request }) => {
	const data = await request.formData()
	const username = data.get('username')
	const password = data.get('password')

	if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
		return invalid(400, { invalid: true })
	}

	let user_added = await register_user(username, password)
	
	if (!user_added) {
		return invalid(400, {registrationFailed: true})
	}
	throw redirect(303, '/')
}

const login: Action = async ({ cookies, request }) => {
	 const data = await request.formData()
	 const username = data.get('username')
	 const password = data.get('password')

	 if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
		return invalid(400, { invalid: true })
	}

	let loginSuccessful = await login_user(username, password)
		if (!loginSuccessful) {
			return invalid(400, {loginFailed: true})
		}

	// TODO: Send the session UUID to database

	// Create cookie
	cookies.set('session', crypto.randomUUID(), {
		// send cookie for every page
		path: '/',
		// server side only cookie so you can't use document.cookie
		httpOnly: true,
		// only requests from same site can send cookies
		sameSite: 'strict',
		// only sent over HTTPS in production
		secure: process.env.NODE_ENV === 'production',
		// one month expiration
		maxAge: 60 * 60 * 24 * 30
	})
	// throw redirect(303, '/');
}

export const actions: Actions = { register, login }