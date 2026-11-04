import { Hono } from "hono"
import { internalServerError } from "~server/libs/handler-modules"
import type { ApiEnv } from "~server/types"
import { OrganizationRepository } from "./repository"

export const organizationApi = new Hono<ApiEnv>()
	.basePath("/organizations")
	.get("/me", async (c) => {
		const auth = c.get("auth")
		const session = await auth.api.getSession({ headers: c.req.raw.headers })
		if (!session) return c.json({ error: "unauthorized" }, 401)
		const userId = session.user.id
		const repo = new OrganizationRepository(c.get("db"))
		const result = await repo.listByMemberId(userId)
		return result
			.tapError((e) => console.log(e))
			.match(
				(organizations) => c.json({ organizations }, 200),
				() => internalServerError(c),
			)
	})
	.get("/:organizationId", async (c) => {
		const repo = new OrganizationRepository(c.get("db"))
		const result = await repo.getById(c.req.param().organizationId)
		return result.match(
			(organization) => {
				if (organization) return c.json({ organization }, 200)
				return c.json({ error: "not found" }, 404)
			},
			() => internalServerError(c),
		)
	})
