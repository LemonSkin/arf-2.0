<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import '../app.css';

	import { page } from '$app/stores'
	
	// console.log($page.data.user)
</script>

<Header />

<main>
	<nav>
		{#if $page.data.user}
			<p>Hello there {$page.data.user['name']}</p>
		{/if}
	</nav>
	<slot />
</main>

<Footer />

<style>

</style>
