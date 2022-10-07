import type { Handle } from '@sveltejs/kit'

import { get_user_session } from '$lib/database'

export const handle: Handle = async ({ event, resolve }) => {
    // Read the cookie for the current session
    const session = event.cookies.get('session')
    
    // If no session exists then just chill
    if (!session) {
        return await resolve(event)
    }

    // Get the user that owns the cookie
    const user = await get_user_session(session);

    if (user) {
        event.locals.user = {
            name: user.username,
            role: user.role
        }
    }

    return await resolve(event)
}