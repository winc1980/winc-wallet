import type { RepositoryError } from "~server/domain/errors"
import type { Result } from "~server/libs/result"
import type { Organization } from "./types"

export interface IOrganizationRepository {
	getById(
		organizationId: string,
	): Promise<Result<Organization | null, RepositoryError>>
	listByMemberId(
		userId: string,
	): Promise<Result<Organization[], RepositoryError>>
}
