import { eq } from "drizzle-orm"
import { Hono } from "hono"
import {
	organizationMembersTable,
	organizationsTable,
	usersTable,
} from "~server/db/schema"
import type { ApiEnv } from "../../types"

export default new Hono<ApiEnv>()
	.get("/me", async (c) => {
		const auth = c.get("auth")
		const session = await auth.api.getSession({ headers: c.req.raw.headers })
		if (!session) return c.json({ error: "unauthorized" }, 401)
		const userId = session.user.id
		const db = c.get("db")
		const organizations = await db
			.select({ organizations: organizationsTable })
			.from(organizationMembersTable)
			.innerJoin(
				organizationsTable,
				eq(organizationMembersTable.organizationId, organizationsTable.id),
			)
			.innerJoin(usersTable, eq(organizationMembersTable.userId, usersTable.id))
			.where(eq(usersTable.id, userId))
			.then((rows) => rows.map((r) => r.organizations))

		return c.json({ organizations })
	})
	.get("/:organizationId", async (c) => {
		const db = c.get("db")
		const [organization] = await db
			.select()
			.from(organizationsTable)
			.where(eq(organizationsTable.id, c.req.param().organizationId))
			.limit(1)

		if (!organization) return c.json({}, 404)
		return c.json(organization)
	})
