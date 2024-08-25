// type Option = {
//     text: string,
//     votes: number,
//     percentage: number,
//     id: string
// }
// export type PollData = {
//     title: string;
//     description: string;
//     options: Option[]
// };

export class PollData {
	title = $state('')
	description = $state('')
	#options: OptionData[] = $state([])
	options: OptionDataRepresentation[] = $derived.by(() =>
		this.#options.map(v => new OptionDataRepresentation(v))
	)
	allVotesCount = $derived.by(() => this.#options.reduce((p, v) => p + v.votes, 0))

	constructor() {
		$effect(() => {
			this.#options.map(option => {
				option.allVotesCount = this.allVotesCount
			})
		})
	}
}

class OptionData {
	allVotesCount = $state(0)

	text = $state('')
	votes = $state(0)
	percentage = $derived(this.votes / this.allVotesCount)
	id = $state('')
}

export class OptionDataRepresentation {
	text = $derived.by(() => this.option.text)
	votes = $derived.by(() => this.option.votes)
	percentage = $derived.by(() => this.option.percentage)
	id = $derived.by(() => this.option.id)

	constructor(private option: OptionData) {}
}
