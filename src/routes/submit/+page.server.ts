import { invalid, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'
import { db } from '$lib/database'
import { getDocs, collection } from 'firebase/firestore'

export const load: PageServerLoad = async ({ locals }) => {
    
    if (locals.user === undefined) {
        throw redirect(302, '/login')
    }

    const projects: string[] = [];
    const projectsSnapshot = await getDocs(collection(db, "projects"));
    projectsSnapshot.forEach((doc) => {
        projects.push(doc.id);
    });

    const categories: string[] = [];
    const categoriesSnapshot = await getDocs(collection(db, "project_categories"));
    categoriesSnapshot.forEach((doc) => {
        categories.push(doc.id);
    });

    const users: string[] = [];
    const usersSnapshot = await getDocs(collection(db, "users"));
    usersSnapshot.forEach((doc) => {
        users.push(doc.id);
    });

    return {projects, categories, users}
}

const submit: Action = async ({ request }) => {
    const data = await request.formData();
    const title = data.get('review_title');
    const project = data.get('project');
    const category = data.get('category');
    const reviewers = data.getAll('reviewers');
    const reviewRoles = data.getAll('roles');
    const files = data.getAll('files');
    const instructions = data.get('instructions');

    let reviewersN = [];
    for(let i = 0; i < reviewers.length; i++) {
        reviewersN[i] = {id: reviewers[i], role: reviewRoles[i]}
    }

    let filesN = [];
    for(let i = 0; i < files.length; i++) {
        filesN[i] = {id: "File "+(i+1), path: files[i]}
    }

    console.log(reviewers, reviewRoles);
    // console.log(files);
    // console.log(instructions);

    return invalid(400, {reviewersN, filesN, title, category, project, submissionFailed: true})
}

export const actions: Actions = { submit }