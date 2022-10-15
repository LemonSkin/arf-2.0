<script lang="ts">
	// import { enhance } from '$app/forms'
	import Alert from '$lib/Alert.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
	let alertRef;
</script>

<main>
	<h1 class="text-center text-4xl text-gray-900 my-4">Log In/Register</h1>

	<form method="POST" autocomplete="off">
		<div class="flex flex-row items-center">
			<div class="flex basis-1/4 justify-center" />

			<div class="flex flex-col basis-1/2 gap-1 items-center">
				<input
					name="username"
					type="text"
					required
					value={form?.username ?? ''}
					placeholder="Username"
					class="input input-primary input-bordered text-center w-full"
				/>
				<input
					type="password"
					name="password"
					required
					value={form?.name ?? ''}
					placeholder="Password"
					class="input input-primary input-bordered text-center w-full"
				/>
			</div>

			<div class="flex basis-1/4 justify-center">
				{#if form?.error}
					<Alert message={form?.message} />
				{/if}
			</div>
		</div>

		<div class="flex flex-row justify-center m-1 gap-1">
			<button formaction="?/login" type="submit" class="btn btn-secondary basis-1/4">
				Login
			</button>
			<button formaction="?/register" type="submit" class="btn btn-secondary basis-1/4">
				Register
			</button>
		</div>
	</form>
</main>
