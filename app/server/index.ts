import { Hono } from "hono"
import { RouterContextProvider } from "react-router"
import { createHonoServer } from "react-router-hono-server/cloudflare"
import { api } from "~api/index"
import { createDb } from "~app/db/client"
import { createAuth } from "~app/lib/auth"
import { apiFetchContext, authContext, cookieContext } from "~app/lib/context"

const app = new Hono<{ Bindings: CloudflareBindings }>()

export default await createHonoServer({
	app,
	configure(server) {
		server.route("/api", api)
	},
	async getLoadContext(c) {
		const context = new RouterContextProvider()

		context.set(apiFetchContext, async (input, init) =>
			app.fetch(new Request(input, init), c.env, c.executionCtx),
		)

		context.set(cookieContext, c.req.header("cookie") ?? "")

		context.set(
			authContext,
			createAuth((await createDb(c.env.HYPERDRIVE.connectionString)).db, {
				secret: c.env.BETTER_AUTH_SECRET,
				baseURL: c.env.BETTER_AUTH_URL,
			}),
		)

		return context
	},
})
