import { sql } from "drizzle-orm"
import { Hono } from "hono"
import type { ApiEnv } from "~api/types"

export const dbApi = new Hono<ApiEnv>().get("/health/db", async (c) => {
	const db = c.get("db")
	await db.execute(sql`select 1`)
	return c.json({ ok: true })
})
