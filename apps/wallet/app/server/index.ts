import { Hono } from "hono"
import { createHonoServer } from "react-router-hono-server/cloudflare"

const app = new Hono<{ Bindings: CloudflareBindings }>()

export default await createHonoServer({
	app,
	configure(app) {
		app.get("/api", (c) => c.json({ message: "hello from hono" }))
	},
})
