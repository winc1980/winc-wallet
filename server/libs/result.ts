import * as z from "zod"
import { type BaseTaggedError, UnknownError } from "./errors"

interface IResult<T, E extends BaseTaggedError> {
	isSuccess(): this is Success<T, E>
	isFailed(): this is Fail<T, E>
	map<U>(f: (value: T) => U): Result<U, E>
	mapError<F extends BaseTaggedError>(f: (error: E) => F): Result<T, F>
	match<A, B = A>(onSuccess: (value: T) => A, onFail: (error: E) => B): A | B
	tap(f: (value: T) => unknown): this
	tapError(f: (error: E) => unknown): this
}

export class Success<T, E extends BaseTaggedError> implements IResult<T, E> {
	readonly success = true
	readonly value: T
	constructor(value: T) {
		this.value = value
	}
	isSuccess(): this is Success<T, E> {
		return true
	}
	isFailed(): this is Fail<T, E> {
		return false
	}
	map<U>(f: (value: T) => U): Result<U, never> {
		return success(f(this.value))
	}
	mapError<F extends BaseTaggedError>(_f: (error: never) => F): Result<T, F> {
		return success(this.value)
	}
	match<A, B = A>(onSuccess: (value: T) => A, _onFail: (error: E) => B): A | B {
		return onSuccess(this.value)
	}
	tap(f: (value: T) => unknown): this {
		f(this.value)
		return this
	}
	tapError(_f: (error: E) => unknown): this {
		return this
	}
}

export class Fail<T, E extends BaseTaggedError> implements IResult<T, E> {
	readonly success = false
	readonly error: E
	constructor(error: E) {
		this.error = error
	}
	isSuccess(): this is Success<T, E> {
		return false
	}
	isFailed(): this is Fail<T, E> {
		return true
	}
	map<U>(_f: (value: T) => U) {
		return fail(this.error)
	}
	mapError<F extends BaseTaggedError>(f: (error: E) => F) {
		return fail(f(this.error))
	}
	match<A, B = A>(_onSuccess: (value: T) => A, onFail: (error: E) => B): A | B {
		return onFail(this.error)
	}
	tap(_f: (value: T) => unknown): this {
		return this
	}
	tapError(f: (error: E) => unknown): this {
		f(this.error)
		return this
	}
}

export type Result<T, E extends BaseTaggedError> = Success<T, E> | Fail<T, E>

export function success<T>(value: T): Result<T, never> {
	return new Success(value)
}

export function fail<E extends BaseTaggedError>(error: E): Result<never, E> {
	return new Fail(error)
}

const nativeErrorSchema = z.object({
	message: z.string(),
	cause: z.unknown().optional().nullable(),
})

export async function wrapPromise<T>(
	promise: Promise<T>,
): Promise<Result<T, UnknownError>> {
	try {
		const value = await promise
		return success(value)
	} catch (e) {
		const parseResult = nativeErrorSchema.safeParse(e)
		if (parseResult.success) {
			return fail(
				new UnknownError(parseResult.data.message, parseResult.data.cause),
			)
		}
		return fail(new UnknownError("An unknown error occurred."))
	}
}
