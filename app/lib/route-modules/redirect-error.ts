import type { ClientResponse } from "hono/client"
import type { StatusCode } from "hono/utils/http-status"
import { redirect } from "react-router"
import { type CookieSession, commitSession } from "../session"

/**
 * @deprecated 適当に作成したエラーページへ飛ばします
 */
export async function redirectError(
	res: ClientResponse<{ error: string }, StatusCode, "json">,
	cookie: CookieSession,
): Promise<never> {
	const body = await res.json()
	cookie.flash("error", {
		status: res.status,
		message: body.error,
	})
	throw redirect("/error", {
		headers: { "Set-Cookie": await commitSession(cookie) },
	})
}
