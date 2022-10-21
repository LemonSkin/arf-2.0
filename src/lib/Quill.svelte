<script lang="ts">
	import { onMount } from 'svelte';

	// Output to retrieve conents of Quill box
	export let editorContents = {};
	// export let html;

	let editor: any = null;
	let quill: any = null;

	// Inputs to control Quill options
	export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, 'blockquote', 'link'],
		['bold', 'italic', 'underline'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		[{ align: [] }],
		['clean']
	];
	export let editorOptions: any = null;
	// Input to populate Quill area with a Delta
	export let initContents: any = null;
	onMount(async () => {
		const { default: Quill } = await import('quill');
		quill = new Quill(editor, {
			modules: {
				toolbar: toolbarOptions
			},
			theme: 'snow', // or 'bubble'
			...editorOptions
		});

		// On text change, output Delta will automatically be updated
		quill.on('text-change', function () {
			// html = editor.getElementsByClassName('ql-editor')[0].innerHTML;
			editorContents = quill.getContents();
		});

		// Populate Quill with some content on mount if any exists
		quill.setContents(initContents);
	});
</script>

<svelte:head>
	<link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
</svelte:head>

<div bind:this={editor} />
