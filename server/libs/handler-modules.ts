import type { Context } from "hono"

/**
 * @deprecated 一時的に使用するメソッドです。
 * TODO: 正しくエラーハンドリングすること
 */
export function internalServerErrorResponse(c: Context) {
	return c.json({ error: "Internal server error" }, 500)
}
