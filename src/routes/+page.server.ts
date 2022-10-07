import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { page } from '$app/stores'


export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user === undefined) {
        throw redirect(302, '/login')
    }

	return {
		user: locals.user,
	}
}