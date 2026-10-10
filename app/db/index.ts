import { sql } from "drizzle-orm"
import { Hono } from "hono"
import { createDb } from "./client"

export const dbApi = new Hono<{ Bindings: CloudflareBindings }>().get(
	"/health/db",
	async (c) => {
		const { db, close } = await createDb(c.env.HYPERDRIVE.connectionString)
		try {
			await db.execute(sql`select 1`)
			return c.json({ ok: true })
		} finally {
			c.executionCtx.waitUntil(close())
		}
	},
)
