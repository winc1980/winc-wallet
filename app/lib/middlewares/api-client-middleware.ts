import { hc } from "hono/client"
import { createContext, type MiddlewareFunction } from "react-router"
import type { ApiType } from "~server/index"
import { apiFetchContext, cookieContext } from "../context"

export const apiClientContext = createContext<ReturnType<typeof hc<ApiType>>>()

export const apiClientMiddleware: MiddlewareFunction<Response> = async (
	{ context },
	next,
) => {
	const api = hc<ApiType>("http://internal/api", {
		fetch: context.get(apiFetchContext),
		headers: { cookie: context.get(cookieContext) },
	})
	context.set(apiClientContext, api)
	return await next()
}
