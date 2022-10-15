<script lang="ts">
	import type { PageData } from './$types';
	// import { page } from '$app/stores'

	export let data: PageData;
	$: reviewing = data.reviewing;

	function handleSubmit() {
		console.log('clicked');
	}
</script>

<h1 class="text-center text-4xl text-gray-900 my-4">Welcome to Artefact Review System Extended</h1>

<div class="mx-3 my-3">
	<p>Items to review</p>
	{#each reviewing as review}
		<form method="POST" action="?/review">
			<button type="submit" class="btn btn-accent btn-block text-left justify-start">
				<input type="hidden" name="title" value={review.title} />
				<div>
					<p name="revTitle">Title: {review.title}</p>
					<p name="revAuthor">Author: {review.presenter}</p>
				</div>
			</button>
		</form>
	{/each}
</div>

<div class="mx-3 my-3">
	<p>My reviews</p>
</div>
