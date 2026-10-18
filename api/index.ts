import { GoogleGenAI } from "@google/genai"
import { Hono } from "hono"
import { authProviderMiddleware } from "./middlewares/auth"
import { dbMiddleware } from "./middlewares/db"
import { r2Middleware } from "./middlewares/r2"
import organizationsApi from "./organizations"
import receiptsApi from "./receipts"
import type { ApiEnv } from "./types"
import usersApi from "./users"

export const api = new Hono<ApiEnv>()
	.use(dbMiddleware)
	.use(r2Middleware)
	.use(authProviderMiddleware)
	.on(["GET", "POST"], "/auth/*", (c) => {
		const auth = c.get("auth")
		return auth.handler(c.req.raw)
	})
	.get("/", (c) => c.json({ message: "api route" }))
	.get("/ask", async (c) => {
		const ai = new GoogleGenAI({ apiKey: c.env.GEMINI_API_KEY })

		const res = await ai.models.generateContent({
			model: "gemini-3.5-flash-lite",
			contents: "自己紹介してください",
		})

		return c.json({ text: res.text })
	})
	.route("/users", usersApi)
	.route("/receipts", receiptsApi)
	.route("/organizations", organizationsApi)

export type ApiType = typeof api
