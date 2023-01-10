export const invalidPrompt = 'Must be at least 8 characters.'

export async function mockPostEmail(..._: any[]): Promise<[boolean, string]> {
	const res = await new Promise((resolve, reject) => {
		setTimeout(() => {
			reject('Promise rejection')
		}, 1000)
	}).catch(console.error).then(() => null)

	if (!res) {
		return [false, 'Email submission failed.']
	}

	return [!!res, !!res ? '' : invalidPrompt] as never
}