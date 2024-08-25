import { redirect } from '@sveltejs/kit'

export async function load({ locals }) {
	if (!locals.session) {
		redirect(302, '/')
	}
	return {}
}
