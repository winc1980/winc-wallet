import { hc } from "hono/client"
import type { RouterContextProvider } from "react-router"
import type { ApiType } from "~api/index"
import { apiFetchContext, cookieContext } from "./context"

export function getApiClient(context: Readonly<RouterContextProvider>) {
	return hc<ApiType>("http://internal/api", {
		fetch: context.get(apiFetchContext),
		headers: { cookie: context.get(cookieContext) },
	})
}

export function getClientApiClient() {
	if (typeof window === "undefined") {
		throw new Error(
			"getClientApiClient はブラウザでのみ使用できます。サーバーでは getApiClient を使ってください",
		)
	}
	return hc<ApiType>(`${window.location.origin}/api`)
}
