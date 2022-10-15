<script lang="ts">
	import { page } from '$app/stores';
</script>

<header>
	<!-- <div class="title">	
		<h1>Artefact Review System Extended</h1>
	</div> -->
	<!-- <nav data-sveltekit-prefetch > -->
	<nav
		class="sticky top-0 left-0 flex flex-row justify-center p-2 bg-gradient-to-r from-airbus-blue to-airbus-blue-light2 text-white items-center"
	>
		<div class="flex flex-row justify-center basis-1/3 gap-5">
			<a href="/" class="hover:text-red-500">Home</a>
			<a href="/submit" class="hover:text-red-500">Submit Review</a>
			<p class="hover:text-red-500">Search</p>
		</div>

		<div class="flex flex-row justify-center">
			<h1 class="text-3xl">Artefact Review System Extended</h1>
		</div>

		<div class="flex flex-row justify-center basis-1/3 space-x-4">
			<a href="/about" class="hover:text-red-500">About</a>
			{#if $page.data.user === undefined}
				<a href="/login" class="hover:text-red-500">Login</a>
			{:else}
				<form action="/logout" method="POST" class="mx-2 hover:text-red-500">
					<button type="submit">Log out</button>
				</form>
				{#if $page.data.user.role === 'admin'}
					<p class="hover:text-red-500">Admin</p>
				{/if}
			{/if}
		</div>
	</nav>
</header>

<style>
</style>
