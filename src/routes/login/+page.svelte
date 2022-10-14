<script lang="ts">
	// import { enhance } from '$app/forms'
	import Alert from '$lib/Alert.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
	let alertRef;
</script>

<main>
	<h1 class="text-center text-4xl text-gray-900 mt-4">Log In/Register</h1>

	<form method="POST" autocomplete="off" class="mt-10">
		<div class="flex flex-row justify-center p-2">
			<input
				name="username"
				type="text"
				required
				value={form?.username ?? ''}
				placeholder="Username"
				class="input input-primary input-bordered text-center w-1/2"
			/>
		</div>

		<div class="flex flex-row justify-center p-2">
			<input
				type="password"
				name="password"
				required
				value={form?.name ?? ''}
				placeholder="Password"
				class="input input-primary input-bordered text-center w-1/2"
			/>
		</div>

		<div class="flex flex-row justify-center">
			<button formaction="?/login" type="submit" class="m-1 btn btn-primary basis-1/4">
				Login
			</button>
			<button formaction="?/register" type="submit" class="m-1 btn btn-primary basis-1/4">
				Register
			</button>
		</div>

		<div class="flex flex-row justify-center w-full">
			{#if form?.error}
				<!-- <Alert message="ERROR" /> -->
				<Alert message={form?.message}/>
			{/if}
		</div>
	</form>
</main>
