import { eq } from "drizzle-orm"
import {
	organizationMembersTable,
	organizationsTable,
	usersTable,
} from "~server/db/schema"
import type { DB } from "~server/db/types"
import { RepositoryError } from "~server/domain/errors"
import { type Result, wrapPromise } from "~server/libs/result"
import type { IOrganizationRepository } from "./interface"
import type { Organization } from "./types"

export class OrganizationRepository implements IOrganizationRepository {
	constructor(private readonly db: DB) {}

	async getById(
		organizationId: string,
	): Promise<Result<Organization | null, RepositoryError>> {
		const result = await wrapPromise(
			this.db
				.select()
				.from(organizationsTable)
				.where(eq(organizationsTable.id, organizationId))
				.limit(1),
		)

		return result
			.map((rows) => rows[0] ?? null)
			.mapError((e) => new RepositoryError("organization", e.message, e.cause))
	}

	async listByMemberId(
		userId: string,
	): Promise<Result<Organization[], RepositoryError>> {
		const result = await wrapPromise(
			this.db
				.select({ organizations: organizationsTable })
				.from(organizationMembersTable)
				.innerJoin(
					organizationsTable,
					eq(organizationMembersTable.organizationId, organizationsTable.id),
				)
				.innerJoin(
					usersTable,
					eq(organizationMembersTable.userId, usersTable.id),
				)
				.where(eq(usersTable.id, userId)),
		)
		return result
			.map((rows) => rows.map((row) => row.organizations))
			.mapError((e) => new RepositoryError("organization", e.message, e.cause))
	}
}
