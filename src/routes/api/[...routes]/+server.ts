import hono from '$lib/server/hono'
export const fallback = event => hono.fetch(event.request, event.locals)
