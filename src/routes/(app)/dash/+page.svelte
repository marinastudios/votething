<script lang=ts>
    let title = $state("Poll");
    let description = $state("");
    let options = $state<{ name: string, id: string }[]>([{ name: '', id: crypto.randomUUID() }])
</script>

<div class="flex flex-row items-center justify-center !w-full">
    <div class="card bg-base-200 m-2 min-h-40 min-w-96 max-w-3xl sm:flex-grow sm:mx-20 p-2 pt-4">
        <input class="input input-ghost hover:input-bordered text-xl font-extrabold" bind:value={title} />
        <input class="input input-ghost hover:input-bordered input-sm text-base-content/55 text-sm" bind:value={description}>
        <div class="h-4"></div>
            <!-- svelte-ignore a11y_label_has_associated_control -->
        <label class="btn btn-disabled no-animation px-0">
            <div class="relative flex h-full w-full">
                <div class="flex h-full w-full items-center justify-center">
                    <input class="text-base-content flex-grow text-left input input-ghost hover:input-bordered !pointer-events-auto"/>
                </div>
            </div>
        </label>
    </div>
    
</div>