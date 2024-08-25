import { fail, setError, superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { z } from 'zod'
import { hash, verify } from '@ts-rex/argon2'
import { db } from '$lib/server/db'
import { cookieController, createSessionForUser } from '$lib/server/auth'
import { redirect } from '@sveltejs/kit'
import ids from '$lib/ids'

const schema = z.object({
	login: z
		.string()
		.min(4, 'must be atleast 4 characters')
		.max(32, 'must be less than 32 characters')
		.regex(/^[a-z0-9_-]+$/i, `must be alphanumeric, with the exception of "_" and "-"`),
	password: z.string().min(8, 'must be atleast 8 characters').max(255)
})

export async function load({ locals }) {
	if (locals.session) {
		return redirect(302, '/dash')
	}
	const form = await superValidate(zod(schema))
	return { form }
}

export const actions = {
	login: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(schema))

		if (!form.valid) return fail(400, { form })
		const { login, password } = form.data
		const user = (await db.auth.user.findByPrimaryIndex('login', login))?.flat()
		if (!user) return setError(form, 'user does not exist')
		const isvalid = verify(password, user.passwordHashed)
		if (!isvalid) return setError(form, 'incorrect password')
		const session = await createSessionForUser(user.id)
		if (session.isSome()) {
			const sessionCookie = cookieController.createCookie(session.unwrap().id)
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			})
			return redirect(302, '/dash')
		} else {
			return fail(500, { form })
		}
	},
	signup: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(schema))
		if (!form.valid) return fail(400, { form })
		const { login, password } = form.data

		const userId = ids.user()
		const passwordHashed = hash(password)

		const user = (await db.auth.user.findByPrimaryIndex('login', login))?.flat()
		if (user) return setError(form, 'login', 'username already exists')
		await db.auth.user.set(userId, {
			login,
			passwordHashed
		})
		const session = await createSessionForUser(userId)
		if (session.isSome()) {
			const sessionCookie = cookieController.createCookie(session.unwrap().id)
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			})
			return redirect(302, '/dash')
		} else {
			return fail(500, { form })
		}
	}
}