import type { z } from 'zod'
import { db } from './db'
import { Option, None, Some } from '@oxi/option'
import type { FlatDocumentData } from '@olli/kvdex'
import { TimeSpan } from 'oslo'
import { alphabet, generateRandomString } from 'oslo/crypto'
import { CookieController } from 'oslo/cookie'
import schema from '$lib/schema'

const sessionTimeSpan = new TimeSpan(1, 'w')

async function createSessionForUser(
	user_id: string
): Promise<Option<FlatDocumentData<z.infer<typeof schema.auth.session>, string>>> {
	const user = (await db.auth.user.find(user_id))?.flat()
	if (!user) return None
	const sessionId = generateRandomString(21, alphabet('0-9', 'a-z'))
	const createdSession = await db.auth.session.set(
		sessionId,
		{
			user_id,
		},
		{ expireIn: sessionTimeSpan.milliseconds() }
	)
	if (!createdSession.ok) return None
	return Option.from((await db.auth.session.find(sessionId))?.flat())
}

async function deleteSession(sessionId: string): Promise<void> {
	await db.auth.session.delete(sessionId)
}

async function getUserAndSession(sessionId: string): Promise<
	Option<{
		user: FlatDocumentData<z.infer<typeof schema.auth.user>, string>
		session: FlatDocumentData<z.infer<typeof schema.auth.session>, string>
	}>
> {
	const session = (await db.auth.session.find(sessionId))?.flat()
	if (!session) return None
	const user = (await db.auth.user.find(session.user_id))?.flat()
	if (!user) return None
	await db.auth.session.update(sessionId, {}, { expireIn: sessionTimeSpan.milliseconds() })
	return Some({ user, session })
}

export const sessionCookieExpiration = new TimeSpan(365 * 2, 'd')
export const sessionCookieController = new CookieController(
	'auth_session',
	{
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		path: '/',
	},
	{ expiresIn: sessionCookieExpiration }
)

export const fingerprintCookieExpiration = new TimeSpan(365 * 4, 'd')
export const fingerprintCookieController = new CookieController(
	'id',
	{
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		path: '/',
	},
	{ expiresIn: fingerprintCookieExpiration }
)
export { createSessionForUser, deleteSession, getUserAndSession }
