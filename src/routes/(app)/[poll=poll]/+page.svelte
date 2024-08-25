<script lang="ts">
	import { PollData } from '$lib/client/polldata.svelte'
	import Poll from '$lib/client/components/Poll.svelte'

	const poll = {
		description: 'I forgot how this goes',
		options: [
			{
				id: '1',
				percentage: 33,
				text: 'Something',
				votes: 1,
			},
			{
				id: '2',
				percentage: 33,
				text: 'Something else',
				votes: 1,
			},
			{
				id: '3',
				percentage: 33,
				text: 'Another thing',
				votes: 1,
			},
		],
		title: 'Lorem Ipsum',
	}
    let { data } = $props()
</script>

<Poll {poll} readonly />
