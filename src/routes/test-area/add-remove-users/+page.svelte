<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	let users = ['scrivenm', 'fishers', 'chapmann', 'culla', 'paulr', 'shawn'];
	const roles: string[] = ['Design Reviewer', 'Peer Reviewer', 'Approver', 'Information'];

	// Initialise blank reviewer list or populate if last submission attempt failed
	let reviewers = [{}];
	function addReviewer() {
		console.log(reviewers);
		// Add new blank entry to reviewer list
		reviewers.push({});

		reviewers = reviewers;
	}
</script>

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
			<label for={reviewers[i]} class="mx-2">{i + 1}.</label>
			<select name="reviewers" bind:value={reviewers[i].id} class="select select-primary">
				<option value="" disabled selected>Please choose a reviewer</option>
				{#each users as user}
					<option value={user}>{user}</option>
				{/each}
			</select>
			<select name="roles" bind:value={reviewers[i].role} class="select select-primary">
				<option value="" disabled selected>Please choose a role</option>
				{#each roles as role}
					<option value={role}>{role}</option>
				{/each}
			</select>
			<!-- {#if reviewers.length > 1}
				<button
					type="button"
					on:click={removeReviewer(reviewers[i])}
					class="btn btn-outline btn-error btn-sm">Remove reviewer</button
				>
			{/if} -->
		</div>
	{/each}
</div>
