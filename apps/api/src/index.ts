import type { GeneratedBindings } from "@wallet/app/types"
import { dbApi } from "@wallet/db"
import { Hono } from "hono"

export const api = new Hono<{ Bindings: GeneratedBindings }>()
	.get("/", (c) => c.json({ message: "hello from hono api route" }))
	.route("/", dbApi)
