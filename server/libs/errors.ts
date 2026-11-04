abstract class BaseError {
	readonly message: string
	readonly cause?: unknown

	constructor(message: string, cause?: unknown) {
		this.message = message
		this.cause = cause
	}
}

export abstract class TaggedError<Tag extends string> extends BaseError {
	abstract readonly tag: Tag
}

export type BaseTaggedError = TaggedError<string>

export class UnknownError extends TaggedError<"UnknownError"> {
	readonly tag = "UnknownError"
}
