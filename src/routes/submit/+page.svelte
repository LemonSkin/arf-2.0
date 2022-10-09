<script lang="ts">
    import type { PageData } from "./$types"
    export let data: PageData;
    $: projects = data.projects;
    $: categories = data.categories;
    $: users = data.users;

    let selectedCategory: string;
    
    const roles: string[] = ["Design Reviewer", "Peer Reviewer", "Approver", "Information"];
    // Initialise blank reviewer list
    let reviewers = [{id: "blank", role: "blank"}];
    function addReviewer() {
        // Add a new blank reviewer
        reviewers.push({id: "blank", role: "blank"});
        // Reassign reviews to itself so that it updates on the page
        reviewers = reviewers;
    }

    let filesUnderReview = [{id: "File 1", path: ""}]
    function addFile() {
        filesUnderReview.push({id: "File "+(filesUnderReview.length+1), path:""});
        filesUnderReview = filesUnderReview;
    }
</script>

<h1 class="text-center text-4xl p-4">
    Submit a Review
</h1>

<div>
    <form action="?/submit" method="POST">
        <div class="py-1">
            <label for="review_title"> Review Title: </label>
            <!-- Shouldn't need ID but do need name to get formData() on server -->
            <input name="review_title" type="text" required 
                class="border-2 bg-slate-200">

            <label for="project">Project:</label>
            <select name="project">
                <option value="blank">Please choose a project</option>
                {#each projects as project}
                    <option value={project}>{project}</option>
                {/each}
            </select>

            <label for="category">Category:</label>
            <select name="category" bind:value={selectedCategory} >
                <option value="blank">Please choose a category</option>
                {#each categories as category}
                    <option value={category}>{category}</option>
                {/each}
            </select>
            {#if selectedCategory === 'ECR'}
                <label for="ecrNumber">ECR Number:</label>
                <input name="ecrNumber" type="text" required
                    class="border-2 bg-slate-200">
            {/if}
        </div>

        <div>
            <!-- Allow only one DE and APP, multiple INF and PEER -->
            <p>Reviewers:</p>
            {#each reviewers as reviewer, i}
                <div>
                <select name="reviewers" bind:value={reviewers[i].id} >
                    <option value="blank">Please choose a reviewer</option>
                    {#each users as user}
                        <option value={user}>{user}</option>
                    {/each}
                </select>
                <select name="roles" bind:value={reviewers[i].role}>
                    <option value="blank">Please choose a role</option>
                    {#each roles as role}
                        <option value={role}>{role}</option>
                    {/each}
                </select>
                </div>
            {/each}

            <div>
                <button type="button" on:click={addReviewer}
                        class="ml-1 rounded-lg border-2 bg-slate-200">
                    Add reviewer
                </button>
            </div>
        </div>

        <div>
            <p>Files under review</p>
            {#each filesUnderReview as file, i}
                <div class="py-1">
                    <label for={filesUnderReview[i].id}>{filesUnderReview[i].id}</label>
                    <input name="files" type="text" bind:value={filesUnderReview[i].path} 
                    class="border-2 bg-slate-200">
                </div>
            {/each}
            <div>
                <button type="button" on:click={addFile}
                        class="ml-1 rounded-lg border-2 bg-slate-200">
                    Add file
                </button>
            </div>
        </div>

        <div>
            <button type="submit" 
            class="ml-1 rounded-lg border-2 bg-slate-200">
            Submit review
            </button>
        </div>
    </form>
</div>