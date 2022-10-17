<script lang="ts">
	import { onMount } from 'svelte';
	export let html = '';

	let editor: any = null;
	let quill: any = null;
	onMount(async () => {
		const { default: Quill } = await import('quill');
		// editor = document.getElementById('editor');
		quill = new Quill(editor, {
			modules: {
				toolbar: [
					[{ header: 1 }, { header: 2 }, 'blockquote', 'link'],
					['bold', 'italic', 'underline'],
					[{ list: 'ordered' }, { list: 'bullet' }],
					[{ align: [] }],
					['clean']
				]
			},
			placeholder: 'Type something...',
			theme: 'snow' // or 'bubble'
		});

		quill.on('text-change', function (delta, oldDelta, source) {
			html = editor.getElementsByClassName('ql-editor')[0].innerHTML;
		});
	});
</script>

<div bind:this={editor} />
