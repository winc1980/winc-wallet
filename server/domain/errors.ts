import { TaggedError } from "~server/libs/errors"

export class RepositoryError extends TaggedError<"RepositoryError"> {
	readonly tag = "RepositoryError"
	readonly repositoryName: string

	constructor(repositoryName: string, message: string, cause?: unknown) {
		super(message, cause)
		this.repositoryName = repositoryName
	}
}
