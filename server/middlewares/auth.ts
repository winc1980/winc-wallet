import { createMiddleware } from "hono/factory"
import { createAuth } from "~app/lib/auth"
import type { ApiEnv } from "../types"

export const authProviderMiddleware = createMiddleware<ApiEnv>(
	async (c, next) => {
		const db = c.get("db")
		const auth = createAuth(db, {
			secret: c.env.BETTER_AUTH_SECRET,
			baseURL: c.env.BETTER_AUTH_URL,
		})
		c.set("auth", auth)

		await next()
	},
)
