import { createMiddleware } from "hono/factory"
import { createDb } from "~server/db/client"
import type { ApiEnv } from "../types"

export const dbMiddleware = createMiddleware<ApiEnv>(async (c, next) => {
	const { db, close } = await createDb(c.env.HYPERDRIVE.connectionString)
	c.set("db", db)
	await next()
	c.executionCtx.waitUntil(close())
})
