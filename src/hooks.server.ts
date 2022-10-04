import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
    const session = event.cookies.get('session')
    // console.log(session)

    if (!session) {
        return await resolve(event)
    }

    event.locals.user = {
        name: 'scrivenm',
        role: 'ADMIN'
    }

    return await resolve(event)
}