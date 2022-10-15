<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	export let data: PageData;
	$: projects = data.projects;
	$: categories = data.categories;
	$: users = data.users;

	export let form: ActionData;

	//Used for the roles dropdown list
	const roles: string[] = ['Design Reviewer', 'Peer Reviewer', 'Approver', 'Information'];

	// Initialise blank reviewer list or populate if last submission attempt failed
	export let reviewers = form?.reviewersN ?? [{}];
	function addReviewer() {
		// Add a new blank reviewer
		reviewers.push({});
		// Reassign reviews to itself so that it updates on the page
		reviewers = reviewers;
	};
	function removeReviewer(reviewer: string) {
		for(let i = 0; i < reviewers.length; i++){
			if (reviewers[i].id === reviewer) {
				reviewers.splice(i, 1);
			}
		}
		reviewers = reviewers;
	};

	// Initialise blank files under review list or populate if last submission attempt failed
	let filesUnderReview = form?.filesN ?? [{ id: 'File 1', path: '' }];
	function addFile() {
		// Add a new blank file
		filesUnderReview.push({ id: 'File ' + (filesUnderReview.length + 1), path: '' });
		// Ressign to so that it updates on page
		filesUnderReview = filesUnderReview;
	};
	function removeFile(file: string) {
		for(let i = 0; i < filesUnderReview.length; i++) {
			if(filesUnderReview[i].id === file) {
				filesUnderReview.splice(i, 1);
			}
		}
		filesUnderReview = filesUnderReview;
	}

	let editor;
	let quill;
	let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, 'blockquote', 'link'],
		['bold', 'italic', 'underline', 'strike'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		[{ align: [] }],
		['clean']
	];
	onMount(async () => {
		const { default: Quill } = await import('quill');
		quill = new Quill(editor, {
			modules: {
				toolbar: toolbarOptions
			},
			theme: 'snow',
			placeholder: 'Instructions'
		});
	});
</script>

<svelte:head>
	<link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
</svelte:head>

<main>
	<h1 class="text-center text-4xl my-4">Submit a Review</h1>

	{#if form?.submissionFailed}
		<p>Failed to submit review!</p>
	{/if}
	<form
		action="?/submit"
		method="POST"
		autocomplete="off"
		use:enhance={({ data }) => {
			data.set('instructions', JSON.stringify(quill.getContents()['ops']));
		}}
		class="mx-2"
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
					class="input input-primary input-bordered text-center w-full"
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
				<!-- {#if selectedCategory === 'ECR'}
					<p>ECR Number:</p>
				{/if} -->
				<!-- TODO: Add element to input RT reference number -->
			</div>
		</div>

		<!-- Reviewers and roles -->
		<div class="my-4">
			<div class="flex flex-row items-center space-x-4 my-2">
				<h1 class="text-2xl font-bold">Reviewers</h1>
				<button type="button" on:click={addReviewer} class="btn btn-sm btn-outline btn-success"
					>Add reviewer</button
				>
			</div>

			{#each reviewers as reviewer, i}
				<div class="my-2">
					<label for={reviewers[i].id} class="mx-2">{i + 1}.</label>
					<select name="reviewers" bind:value={reviewers[i].id} class="select select-primary">
						<option value="default">Please choose a reviewer</option>
						{#each users as user}
							<option value={user}>{user}</option>
						{/each}
					</select>
					<select name="roles" bind:value={reviewers[i].role} class="select select-primary">
						<option value="default">Please choose a role</option>
						{#each roles as role}
							<option value={role}>{role}</option>
						{/each}
					</select>
					{#if reviewers.length > 1}
						<button type="button" on:click={removeReviewer(reviewers[i].id)} class="btn btn-sm btn-outline btn-error">Remove reviewer</button>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Files under review -->
		<div class="my-4">
			<div class="flex flex-row items-center space-x-4 my-2">
				<h1 class="text-2xl font-bold">Files Under Review</h1>
				<button type="button" on:click={addFile} class="btn btn-sm btn-outline btn-success"
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
						class="input input-primary input-bordered w-1/2"
					/>
					{#if filesUnderReview.length > 1}
						<button type="button" on:click={removeFile(filesUnderReview[i].id)} class="btn btn-sm btn-outline btn-error">Remove file</button>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Instructions -->
		<div class="my-4">
			<div class="flex flex-row items-center space-x-4 my-2">
				<h1 class="text-2xl font-bold">Instructions</h1>
			</div>
			<div class="editor-wrapper">
				<div bind:this={editor} />
			</div>
		</div>

		<!-- Submit -->
		<div class="text-center">
			<button type="submit" class="btn btn-secondary"> Submit review </button>
		</div>
	</form>
</main>
