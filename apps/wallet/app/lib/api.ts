import { hc } from "hono/client"
import type { RouterContextProvider } from "react-router"
import type { ApiType } from "~/server/types"
import { apiFetchContext, cookieContext } from "./context"

export function getApiClient(context: Readonly<RouterContextProvider>) {
	return hc<ApiType>("http://internal/api", {
		fetch: context.get(apiFetchContext),
		headers: { cookie: context.get(cookieContext) },
	})
}
