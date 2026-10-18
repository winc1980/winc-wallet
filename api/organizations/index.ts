import { eq } from "drizzle-orm"
import { Hono } from "hono"
import type { ApiEnv } from "~api/types"
import { organizationsTable } from "~app/db/schema"

export default new Hono<ApiEnv>().get("/:organizationId", async (c) => {
	const db = c.get("db")
	const [organization] = await db
		.select()
		.from(organizationsTable)
		.where(eq(organizationsTable.id, c.req.param().organizationId))
		.limit(1)

	if (!organization) return c.json({}, 404)
	return c.json(organization)
})
