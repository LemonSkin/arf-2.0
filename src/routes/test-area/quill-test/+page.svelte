<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	import Quill from '$lib/Quill.svelte';
	let editor = [];
	let contents = [];

	function printDelta() {
		// console.log(contents[0]);
		console.log(JSON.stringify(contents[0]));
	}

	let testDelta = {
		ops: [
			{
				insert: 'Hello there'
			},
			{
				attributes: {
					header: 1
				},
				insert: '\n'
			},
			{
				attributes: {
					bold: true
				},
				insert: 'Test bold text'
			},
			{
				insert: '\nTest lists'
			},
			{
				attributes: {
					list: 'ordered'
				},
				insert: '\n'
			},
			{
				insert: 'Test indents'
			},
			{
				attributes: {
					indent: 1,
					list: 'ordered'
				},
				insert: '\n'
			},
			{
				insert: 'Test bullets'
			},
			{
				attributes: {
					list: 'bullet'
				},
				insert: '\n'
			},
			{
				insert: 'Test indents'
			},
			{
				attributes: {
					indent: 1,
					list: 'bullet'
				},
				insert: '\n'
			},
			{
				insert: 'Test them again'
			},
			{
				attributes: {
					indent: 2,
					list: 'bullet'
				},
				insert: '\n'
			},
			{
				attributes: {
					italic: true
				},
				insert: 'Test emphasis'
			},
			{
				insert: '\n'
			},
			{
				attributes: {
					link: 'http://localhost:5173/Test hyperlinks'
				},
				insert: 'Test hyperlinks'
			},
			{
				insert: '\n'
			}
		]
	};
</script>

<main class="mx-2">
	<h1 class="my-4 text-center text-4xl">About - Currently a testing ground for misc. shit</h1>

	<!-- Quill Test Div -->
	<div>
		<button on:click={printDelta} type="button" class="btn btn-secondary basis-1/4">
			Print content!
		</button>

		<h2 class="text-2xl">Action Item 1</h2>
		<div class="flex w-full items-center justify-center">
			<div class="w-2/3">
				<Quill
					bind:this={editor[0]}
					toolbarOptions={false}
					editorOptions={{ readOnly: true }}
					initContents={testDelta}
				/>
			</div>
		</div>
	</div>
</main>

<style>
</style>
