<script lang="ts">
	import type { PollData } from '$lib/client/polldata.svelte'
	let {
		poll,
		'selected-option': selectedOption = $bindable(),
		readonly,
	}: { poll: PollData; ['selected-option']: string; readonly: boolean } = $props()
</script>

<div class="flex !w-full flex-row items-center justify-center">
	<div class="card m-2 min-h-40 min-w-96 max-w-3xl bg-base-200 p-2 pt-4 sm:mx-20 sm:flex-grow">
		<h1 class="text-xl font-extrabold">{poll.title}</h1>
		{#if poll.description}
			<span class="text-sm text-base-content/55">{poll.description}</span>
		{/if}
		<div class="h-4"></div>
		{#each poll.options as option (option.id)}
			<button
				class="group z-[1] px-0"
				onclick={() => !readonly && (selectedOption = option.id)}
				class:btn-active={selectedOption === option.id}
				class:btn={!readonly}
				class:fake-btn={readonly}>
				<div class="relative flex h-full w-full">
					<div
						class="absolute bottom-0 left-0 top-0 -z-[1] flex w-full rounded-lg bg-success/45 transition-[width] duration-500 group-[.btn-active]:bg-success/70"
						style="width: {option.percentage}%">
					</div>
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
</div>

<style lang=postcss>
	.fake-btn {
		@apply inline-flex h-12 gap-2 bg-neutral bg-opacity-20 px-0 text-opacity-20 outline-base-content transition-all duration-200;
		border: var(--border-btn, 1px)
	}
</style>