import { createMiddleware } from "hono/factory"
import type { ApiEnv } from "~api/types"
import { createDb } from "~app/db/client"

export const dbMiddleware = createMiddleware<ApiEnv>(async (c, next) => {
	const { db, close } = await createDb(c.env.HYPERDRIVE.connectionString)
	c.set("db", db)
	await next()
	c.executionCtx.waitUntil(close())
})
