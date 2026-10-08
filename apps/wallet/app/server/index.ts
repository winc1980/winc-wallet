import { api } from "@wallet/api"
import { Hono } from "hono"
import { RouterContextProvider } from "react-router"
import { createHonoServer } from "react-router-hono-server/cloudflare"
import { apiFetchContext, cookieContext } from "~/lib/context"
import type { GeneratedBindings } from "~/server/types"

const app = new Hono<{ Bindings: GeneratedBindings }>()

export default await createHonoServer({
	app,
	configure(server) {
		server.route("/api", api)
	},
	getLoadContext(c) {
		const context = new RouterContextProvider()
		context.set(apiFetchContext, async (input, init) =>
			app.fetch(new Request(input, init), c.env, c.executionCtx),
		)

		context.set(cookieContext, c.req.header("cookie") ?? "")
		return context
	},
})
