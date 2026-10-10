import { Hono } from "hono"

export const api = new Hono<{ Bindings: CloudflareBindings }>().get("/", (c) =>
	c.json({ message: "api route" }),
)

export type ApiType = typeof api
