import { getFingerprintData } from '@thumbmarkjs/thumbmarkjs'

export const ssr = false

export async function load() {
	return {
		fingerprint: await getFingerprintData(),
	}
}
