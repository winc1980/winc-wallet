import { hc } from "hono/client"
import type { ApiType } from "~server/index"

export function getClientApiClient() {
	if (typeof window === "undefined") {
		throw new Error(
			"getClientApiClient はブラウザでのみ使用できます。サーバーでは getApiClient を使ってください",
		)
	}
	return hc<ApiType>(`${window.location.origin}/api`)
}
