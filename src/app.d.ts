// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { FlatDocumentData } from '@olli/kvdex'
import schema from '$lib/schema'
import z from 'zod'
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface Locals {
			user: FlatDocumentData<z.infer<typeof schema.user>, string> | null
			session: FlatDocumentData<z.infer<typeof schema.session>, string> | null
		}
	}
}

export {}