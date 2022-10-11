<script lang="ts">
    import { enhance } from '$app/forms'
    import type { ActionData } from './$types'

    export let form: ActionData

</script>

<h1 class="text-center text-4xl p-4">
    Log In/Register
</h1>

<form method="POST" autocomplete="off" class="text-lg p-2">

    <div class="py-1">
        <label for="username">
            Username:
        </label>
        <input name="username" type="text" value={form?.username ?? ''} required 
            class="border-2 bg-slate-200">
    </div> 

    <div class="py-1">
        <label for="password">
            Password:
        </label>
        <input name="password" placeholder="password" type="password" required 
            class="border-2 bg-slate-200">
    </div>

{#if form?.registrationFailed}
    <p>Username is taken.</p>
{/if}

{#if form?.loginFailed}
    <p>Details incorrect!</p>
{/if}

{#if form?.invalid}
    <p>Something has gone horribly wrong</p>
{/if}

    <div class="flex flex-row px-2 py-1">
        <button formaction="?/login" type="submit" 
        class="ml-1 rounded-lg border-2 bg-slate-200">
        Login
        </button>
        <button formaction="?/register" type="submit" 
            class="ml-1 rounded-lg border-2 bg-slate-200">
            Register
        </button>

    </div>

</form>