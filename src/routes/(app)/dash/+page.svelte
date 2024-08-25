<script lang="ts">
	import { goto } from '$app/navigation'
	import api from '$lib/client/api'

	let title = $state('Poll')
	let description = $state('')
	let options = $state<{ name: string; id: string }[]>([{ name: '', id: crypto.randomUUID() }])
	let doWriteIn = $state(false)
	async function createPoll() {
		const res = await api.poll.create.$post({
			json: {
				description,
				options,
				title,
				doWriteIn,
			},
		})
		const json = await res.json()
		if (!json.error) {
			goto(`/~${json.id}`)
		}
	}
</script>

<div class="flex !w-full flex-row items-center justify-center">
	<div class="card m-2 min-h-40 min-w-96 max-w-3xl bg-base-200 p-2 pt-4 sm:mx-20 sm:flex-grow">
		<input
			placeholder="Title"
			class="input input-ghost text-xl font-extrabold hover:input-bordered placeholder:text-base-content/30"
			bind:value={title} />
		<input
			placeholder="description"
			class="input input-sm input-ghost text-sm text-base-content/55 hover:input-bordered placeholder:text-base-content/30"
			bind:value={description} />
		<div class="h-4"></div>
		{#each options as option, i (option.id)}
			<label
				class="group inline-flex h-12 gap-2 bg-neutral bg-opacity-20 px-0 text-base-content text-opacity-20 outline-base-content transition-all duration-200 hover:bg-base-300">
				<div class="relative flex h-full w-full">
					<div class="flex h-full w-full items-center justify-center">
						<input
							placeholder="Option {i + 1}"
							class="input input-ghost flex-grow text-left text-base-content placeholder:text-base-content/30"
							bind:value={option.name} />
						<button
							disabled={!(options.length - 1)}
							onclick={() => (options = options.filter(v => v.id !== option.id))}
							class="btn btn-square btn-ghost btn-xs opacity-20 disabled:btn-disabled group-hover:opacity-100">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="size-6">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
								></path>
							</svg>
						</button>
						{#if i === options.length - 1}
							<button
								class="btn btn-square btn-ghost btn-xs"
								onclick={() => options.push({ id: crypto.randomUUID(), name: '' })}
								>+</button>
						{/if}
					</div>
				</div>
			</label>
		{/each}
		<div class="form-control">
			<label class="label cursor-pointer">
				<input type="checkbox" class="toggle" bind:checked={doWriteIn} />
				<span class="label-text">Allow Write-ins</span>
			</label>
		</div>
		<button class="btn btn-primary" onclick={createPoll}>Create poll</button>
	</div>
</div>
