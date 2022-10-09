import type { Handle } from '@sveltejs/kit'

import { db } from '$lib/database'
import { query, collection, where, getDocs } from 'firebase/firestore'

export const handle: Handle = async ({ event, resolve }) => {
    // Read the cookie for the current session
    const session = event.cookies.get('session')
    
    // If no session exists then do nothing
    if (!session) {
        return await resolve(event)
    }

    const q = query(collection(db, "users"), where("session", "==", session));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        event.locals.user = {name: doc.id, 
                            role: doc.data()["role"]}
    });

    return await resolve(event)
}