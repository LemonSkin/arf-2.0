import { redirect } from '@sveltejs/kit'
import { db } from '$lib/database'
import { getDocs, collection, query, where } from 'firebase/firestore'
import type { PageServerLoad } from './$types'

type Review = {
    presenter?: string;
    project?: string;
    title?: string;
};

export const load: PageServerLoad = async ({ locals }) => {
    
    if (locals.user === undefined) {
        throw redirect(302, '/login')
    }

    // Find all reviews that user is assigned
    const to_review = query(collection(db, 'reviews'), where('reviewers', 'array-contains', locals.user.name))
    const querySnapshot = await getDocs(to_review);
    
    const reviewing: Review[] = [];
    querySnapshot.forEach((doc) => {
        reviewing.push(doc.data() as Review)
    })

    return {
        reviewing
    };
}