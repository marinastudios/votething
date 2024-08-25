<script lang="ts">
	import type { PollData } from '$lib/client/polldata.svelte';
	let {
		poll,
		'selected-option': selectedOption = $bindable()
	}: { poll: PollData; ['selected-option']: string } = $props();
</script>

<div class="card bg-base-200 m-2 min-h-40 p-2 pt-4">
	<h1 class="text-xl font-extrabold">{poll.title}</h1>
	{#if poll.description}
		<span class="text-base-content/55 text-sm">{poll.description}</span>
	{/if}
	<div class="h-4"></div>
	{#each poll.options as option (option.id)}
		<button class="btn group z-[1] px-0" onclick={() => selectedOption = option.id} class:btn-active={selectedOption === option.id}>
			<div class="relative flex h-full w-full">
				<div
					class="bg-success/45 group-[.btn-active]:bg-success/70 absolute bottom-0 left-0 top-0 -z-[1] flex w-full rounded-lg transition-[width] duration-500"
					style="width: {option.percentage}%"
				></div>
				<div class="flex h-full w-full items-center justify-center px-2">
					<span class="flex-grow text-left">{option.text}</span>
					<span class="countdown">
                        <span style="--value:{Math.min(option.votes, 99)};"></span>
                        {#if option.votes > 99}+{/if}
                    </span>
				</div>
			</div>
		</button>
	{/each}
	<!-- <button class="btn btn-active z-[1] px-0">
		<div class="relative flex h-full w-full">
			<div
				class="bg-success/70 absolute bottom-0 left-0 top-0 -z-[1] flex w-full rounded-lg transition-all duration-500"
				style="width: 17%"
			></div>
			<div class="flex h-full w-full items-center justify-center px-2">
				<span class="flex-grow text-left">{option.text}</span>
				<span class="text-base-content/55">{option.votes}</span>
			</div>
		</div>
	</button>
	<button class="btn z-[1] px-0">
		<div class="relative flex h-full w-full">
			<div
				class="bg-success/45 absolute bottom-0 left-0 top-0 -z-[1] flex w-full rounded-lg transition-all duration-500"
				style="width: 45%"
			></div>
			<div class="flex h-full w-full items-center justify-center px-2">
				<span class="flex-grow text-left">{option.text}</span>
				<span class="text-base-content/55">{option.votes}</span>
			</div>
		</div>
	</button> -->
</div>
