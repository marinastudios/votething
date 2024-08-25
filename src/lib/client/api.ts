import type { api } from '$lib/api'
import { hc } from 'hono/client'

export default hc<api>('/api', {
	async fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
		return await fetch(input, {
			...init,
			credentials: 'include',
		})
	},
})
