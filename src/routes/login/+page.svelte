<script lang="ts">
	// import { enhance } from '$app/forms'
	import Alert from '$lib/Alert.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
	let alertRef;
</script>

<main>
	<h1 class="my-4 text-center text-4xl text-gray-900">Log In/Register</h1>

	<form method="POST" autocomplete="off">
		<div class="flex flex-row items-center">
			<div class="flex basis-1/4 justify-center" />

			<div class="flex basis-1/2 flex-col items-center gap-1">
				<input
					name="username"
					type="text"
					required
					value={form?.username ?? ''}
					placeholder="Username"
					class="input input-bordered input-primary w-full text-center"
				/>
				<input
					type="password"
					name="password"
					required
					value={form?.name ?? ''}
					placeholder="Password"
					class="input input-bordered input-primary w-full text-center"
				/>
			</div>

			<div class="flex basis-1/4 justify-center">
				{#if form?.error}
					<Alert message={form?.message} />
				{/if}
			</div>
		</div>

		<div class="m-1 flex flex-row justify-center gap-1">
			<button formaction="?/login" type="submit" class="btn btn-secondary basis-1/4">
				Login
			</button>
			<button formaction="?/register" type="submit" class="btn btn-secondary basis-1/4">
				Register
			</button>
		</div>
	</form>
</main>
