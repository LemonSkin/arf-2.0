<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import Quill from '$lib/Quill.svelte';
	// Page data
	export let data: PageData;
	let projects = data.projects;
	let categories = data.categories;
	let users = data.users;
	let roles = data.roles;
	let user = data.user;

	// Action response data
	let form: ActionData;

	// Initialise blank reviewer list or populate if last submission attempt failed
	let reviewers = form?.reviewersN ?? [{}];
	function addReviewer() {
		// Add a new blank reviewer
		reviewers.push({});
		// Reassign reviews to itself so that it updates on the page
		reviewers = reviewers;
		// TODO: Remove already selected reviewers from list of reviewer candidates
	}

	function removeReviewer(reviewer: string) {
		// console.log(reviewers);
		for (let i = 0; i < reviewers.length; i++) {
			if (reviewers[i].id == reviewer) {
				reviewers.splice(i, 1);
				break;
			}
		}
		reviewers = reviewers;
		// TODO: When reviewer removed, add back to list of reviewer candidates
	}

	// Initialise blank files under review list or populate if last submission attempt failed
	let filesUnderReview = form?.filesN ?? [{ id: 'File 1', path: '' }];
	function addFile() {
		// Add a new blank file
		filesUnderReview.push({ id: 'File ' + (filesUnderReview.length + 1), path: '' });
		// Ressign to so that it updates on page
		filesUnderReview = filesUnderReview;
	}
	function removeFile(file: string) {
		for (let i = 0; i < filesUnderReview.length; i++) {
			if (filesUnderReview[i].id === file) {
				filesUnderReview.splice(i, 1);
				break;
			}
		}
		filesUnderReview = filesUnderReview;
	}

	let instructions: string;
</script>

<svelte:head>
	<link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
</svelte:head>

<main class="mx-2">
	<h1 class="my-4 text-center text-4xl">Submit a Review</h1>

	{#if form?.submissionFailed}
		<p>Failed to submit review!</p>
	{/if}
	<form
		action="?/submit"
		method="POST"
		autocomplete="off"
		use:enhance={({ data }) => {
			// console.log(instructions);
			data.set('instructions', instructions);
		}}
	>
		<!-- Review title, project and category -->
		<div class="flex flex-row text-center">
			<div class="basis-1/2">
				<input
					name="title"
					type="text"
					required
					value={form?.title ?? ''}
					placeholder="Review Title"
					class="input input-bordered input-primary w-full text-center"
				/>
			</div>
			<div class="basis-1/2">
				<select name="project" class="select select-primary w-1/3">
					<option value="default">Please choose a project</option>
					{#each projects as project}
						<option value={project}>{project}</option>
					{/each}
				</select>

				<select name="category" class="select select-primary w-1/3">
					<option value="default">Please choose a category</option>
					{#each categories as category}
						<option value={category}>{category}</option>
					{/each}
				</select>
				<!-- TODO: Add element to input RT reference number -->
				<!-- {#if selectedCategory === 'ECR'}
					<p>ECR Number:</p>
				{/if} -->
			</div>
		</div>

		<!-- Reviewers and roles -->
		<div class="my-4">
			<div class="my-2 flex flex-row items-center space-x-4">
				<h1 class="text-2xl font-bold">Reviewers</h1>
				<button type="button" on:click={addReviewer} class="btn btn-outline btn-success btn-sm"
					>Add reviewer</button
				>
			</div>

			<!-- TODO: Add conditions to remove name from list if already selected -->
			{#each reviewers as reviewer, i}
				<div class="my-2">
					<label for={reviewers[i].id} class="mx-2">{i + 1}.</label>
					<select name="reviewers" bind:value={reviewers[i].id} class="select select-primary">
						<option value="default">Please choose a reviewer</option>
						{#each users as user}
							<!-- Check if user has an alias, otherwise use user id -->
							{#if user.alias}
								<option value={user.id}>{user.alias}</option>
							{:else}
								<option value={user.id}>{user.id}</option>
							{/if}
						{/each}
					</select>
					<select name="roles" bind:value={reviewers[i].role} class="select select-primary">
						<option value="default">Please choose a role</option>
						{#each roles as role}
							<option value={role}>{role}</option>
						{/each}
					</select>
					{#if reviewers.length > 1}
						<button
							type="button"
							on:click={removeReviewer(reviewers[i].id)}
							class="btn btn-outline btn-error btn-sm">Remove reviewer</button
						>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Files under review -->
		<div class="my-4">
			<div class="my-2 flex flex-row items-center space-x-4">
				<h1 class="text-2xl font-bold">Files Under Review</h1>
				<button type="button" on:click={addFile} class="btn btn-outline btn-success btn-sm"
					>Add File</button
				>
			</div>
			{#each filesUnderReview as file, i}
				<div class="py-1">
					<label for={filesUnderReview[i].id} class="mx-2">{i + 1}.</label>
					<input
						name="files"
						type="text"
						bind:value={filesUnderReview[i].path}
						class="input input-bordered input-primary w-1/2"
					/>
					{#if filesUnderReview.length > 1}
						<button
							type="button"
							on:click={removeFile(filesUnderReview[i].id)}
							class="btn btn-outline btn-error btn-sm">Remove file</button
						>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Instructions -->
		<div class="my-4">
			<div class="my-2 flex flex-row items-center space-x-4">
				<h1 class="text-2xl font-bold">Instructions</h1>
			</div>
			<div>
				<Quill bind:html={instructions} />
			</div>
		</div>

		<!-- Submit -->
		<div class="text-center">
			<button type="submit" class="btn btn-secondary"> Submit review </button>
		</div>
	</form>
</main>
