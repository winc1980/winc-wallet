import { Hono } from "hono"
import { createHonoServer } from "react-router-hono-server/cloudflare"

const api = new Hono<{ Bindings: CloudflareBindings }>().get("/", (c) =>
	c.json({ message: "hello from hono api route" }),
)

const app = new Hono<{ Bindings: CloudflareBindings }>().route("/api", api)

export default await createHonoServer({ app })
