<script lang="ts">
	import { onMount } from 'svelte';
	import Quill from '$lib/Quill.svelte';

	let test;
	function printQuill() {
		console.log(test);
	}

	let someHTML =
		'<p>These are some instructions. Please review accordingly.</p><ol><li>Go here</li><li>Go there</li><li class="ql-indent-1">Go everywhere</li></ol><p><strong>Don\'t open that box</strong></p><p><em>Open this box</em></p>';

	let moreHTML = "<p>Hello there</p>"
</script>

<svelte:head>
	<link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
</svelte:head>

<main class="mx-2">
	<h1 class="my-4 text-center text-4xl">About - Currently a testing ground for misc. shit</h1>
	<button on:click={printQuill} type="button" class="btn btn-secondary basis-1/4">
		Print content!
	</button>

	<h2 class="text-2xl">Action Item 1</h2>
	<div class="flex w-full items-center justify-center">
		<div class="w-2/3">
			<Quill bind:html={test} />
		</div>
	</div>

	<br />
	Resulting HTML:
	{@html someHTML}
	{@html moreHTML}

	<style>
		li {
			padding-left: 1.5em;
		}
		ol {
			list-style-type: disc;
			list-style-position: inside;
		}
		li.ql-indent-1 {
			padding-left: 4.5em;
		}

		li.ql-indent-2 {
			padding-left: 7.5em;
		}

		li.ql-indent-3 {
			padding-left: 10.5em;
		}

		li.ql-indent-4 {
			padding-left: 13.5em;
		}

		li.ql-indent-5 {
			padding-left: 16.5em;
		}

		li.ql-indent-6 {
			padding-left: 19.5em;
		}

		li.ql-indent-7 {
			padding-left: 22.5em;
		}

		li.ql-indent-8 {
			padding-left: 25.5em;
		}
	</style>
</main>

<style>

</style>
