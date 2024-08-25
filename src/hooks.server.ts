import ids from '$lib/ids'
import {
	sessionCookieController,
	getUserAndSession,
	fingerprintCookieController,
} from '$lib/server/auth'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('auth_session')
	if (!sessionId) {
		event.locals.user = null
		event.locals.session = null
		return resolve(event)
	}

	const res = await getUserAndSession(sessionId)
	if (res.isNone()) {
		const sessionCookie = sessionCookieController.createBlankCookie()
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '/',
			...sessionCookie.attributes,
		})
		event.locals.user = null
		event.locals.session = null
		return resolve(event)
	}
	const { session, user } = res.unwrap()
	const sessionCookie = sessionCookieController.createCookie(session.id)
	event.cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '/',
		...sessionCookie.attributes,
	})
	event.locals.user = user
	event.locals.session = session
	const fingerprint = event.cookies.get(fingerprintCookieController.cookieName) || ids.session()
	const fingerprintCookie = fingerprintCookieController.createCookie(fingerprint)
	event.cookies.set(fingerprintCookie.name, fingerprintCookie.value, {
		path: '/',
		...fingerprintCookie.attributes,
	})
	return resolve(event)
}
