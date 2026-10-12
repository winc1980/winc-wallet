import { GoogleGenAI } from "@google/genai"
import { Hono } from "hono"
import { dbMiddleware } from "./middlewares/db"
import { r2Middleware } from "./middlewares/r2"
import receiptsApi from "./receipts"
import type { ApiEnv } from "./types"

export const api = new Hono<ApiEnv>()
	.use(dbMiddleware)
	.use(r2Middleware)
	.get("/", (c) => c.json({ message: "api route" }))
	.get("/ask", async (c) => {
		const ai = new GoogleGenAI({ apiKey: c.env.GEMINI_API_KEY })

		const res = await ai.models.generateContent({
			model: "gemini-3.5-flash-lite",
			contents: "自己紹介してください",
		})

		return c.json({ text: res.text })
	})
	.route("/receipts", receiptsApi)

export type ApiType = typeof api
