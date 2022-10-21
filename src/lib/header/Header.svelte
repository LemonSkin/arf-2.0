<script lang="ts">
	import { page } from '$app/stores';
</script>

<header>
	<!-- <div class="title">	
		<h1>Artefact Review System Extended</h1>
	</div> -->
	<!-- <nav data-sveltekit-prefetch > -->
	<nav
		class="sticky top-0 left-0 flex flex-row items-center justify-center bg-gradient-to-r from-airbus-blue to-airbus-blue-light2 p-2 text-white"
	>
		<div class="flex basis-1/3 flex-row justify-center gap-5">
			<a href="/" class="hover:text-red-500">Home</a>
			<a href="/submit" class="hover:text-red-500">Submit Review</a>
			<p class="hover:text-red-500">Search</p>
		</div>

		<div class="flex flex-row justify-center">
			<h1 class="text-3xl">Artefact Review System Extended</h1>
		</div>

		<div class="flex basis-1/3 flex-row justify-center space-x-4">
			<a href="/about" class="hover:text-red-500">About</a>
			{#if $page.data.user === undefined}
				<a href="/login" class="hover:text-red-500">Login</a>
			{:else}
				<form action="/logout" method="POST" class="mx-2 hover:text-red-500">
					<button type="submit">Log out</button>
				</form>
				{#if $page.data.user.role === 'admin'}
					<div class="dropdown-hover dropdown">
						<a href="/test-area">Test Area</a>
						<ul class="dropdown-content menu rounded-box w-52 bg-accent p-2 shadow">
							<li><a href="/test-area/quill-test">Quill</a></li>
							<li><a href="/test-area/add-remove-users">Add/Remove Users</a></li>
						</ul>
					</div>
				{/if}
			{/if}
		</div>
	</nav>
</header>

<style>
</style>
