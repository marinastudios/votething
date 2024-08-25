import hono from '$lib/server/hono'
import type { RequestHandler } from '@sveltejs/kit'
export const fallback: RequestHandler = event => hono.fetch(event.request, event.locals)
