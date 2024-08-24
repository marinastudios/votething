<script lang=ts>
	import type { PollData } from "$lib";
	import Poll from "$lib/Poll.svelte";

    const poll: PollData = {
        description: "I forgot how this goes",
        options: [
            {
                id: '1',
                percentage: 33,
                text: "Something",
                votes: 1
            },
            {
                id: '2',
                percentage: 33,
                text: "Something else",
                votes: 1
            },
            {
                id: '3',
                percentage: 33,
                text: "Another thing",
                votes: 1
            }
        ],
        title: "Lorem Ipsum"
    }
</script>


<Poll {poll} />