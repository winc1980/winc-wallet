import { Hono } from "hono"
import { internalServerErrorResponse } from "~server/libs/handler-modules"
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
				() => internalServerErrorResponse(c),
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
			() => internalServerErrorResponse(c),
		)
	})
	.get("/:organizationId/members", async (c) => {
		const repo = new OrganizationRepository(c.get("db"))
		const result = await repo.getAllMembers(c.req.param().organizationId)
		return result.match(
			(members) => {
				if (members) return c.json({ members }, 200)
				return c.json({ error: "not found" }, 404)
			},
			() => internalServerErrorResponse(c),
		)
	})
