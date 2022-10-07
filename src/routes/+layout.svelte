<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import '../app.css';

	import { page } from '$app/stores'
</script>

<Header />

<main>
	<slot />
</main>

<Footer />

<style>

</style>
