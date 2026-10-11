export async function promiseToResult<T>(promise: Promise<T>) {
	return promise
		.then((data) => ({ success: true as const, data }))
		.catch((err) => ({ success: false as const, error: err }))
}
