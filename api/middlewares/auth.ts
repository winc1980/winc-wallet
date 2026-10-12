import { createMiddleware } from "hono/factory"
import type { ApiEnv } from "~api/types"
import { createAuth } from "~app/lib/auth"

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
