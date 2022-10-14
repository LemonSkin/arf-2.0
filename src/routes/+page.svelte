<script lang="ts">
	import type { PageData } from './$types';
	// import { page } from '$app/stores'

	export let data: PageData;
	$: reviewing = data.reviewing;
</script>

<h1 class="text-center text-4xl p-4">Welcome to Artefact Review System Extended (ARSE)</h1>

<div class="mx-3 bg-slate-600">
	{#each reviewing as review}
		<p>Title: {review.title}, Author: {review.presenter}</p>
	{/each}
</div>

<div>Box two</div>
