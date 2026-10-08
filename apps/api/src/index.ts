import type { GeneratedBindings } from "@wallet/app/types"
import { Hono } from "hono"

export const api = new Hono<{ Bindings: GeneratedBindings }>().get("/", (c) =>
	c.json({ message: "hello from hono api route" }),
)
