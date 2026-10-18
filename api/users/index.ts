import { eq } from "drizzle-orm"
import { Hono } from "hono"
import type { ApiEnv } from "~api/types"
import { organizationMembersTable, organizationsTable } from "~app/db/schema"

export default new Hono<ApiEnv>().get("/:userId/organizations", async (c) => {
	const db = c.get("db")
	const organizations = await db
		.select({ organization: organizationsTable })
		.from(organizationMembersTable)
		.innerJoin(
			organizationsTable,
			eq(organizationMembersTable.userId, c.req.param().userId),
		)
		.then((r) => r.map((r) => r.organization))

	return c.json(organizations)
})
