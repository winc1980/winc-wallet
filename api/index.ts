import { GoogleGenAI } from "@google/genai"
import { Hono } from "hono"
import receiptApi from "./receipt"

export const api = new Hono<{ Bindings: CloudflareBindings }>()
	.get("/", (c) => c.json({ message: "api route" }))
	.get("/ask", async (c) => {
		const ai = new GoogleGenAI({ apiKey: c.env.GEMINI_API_KEY })

		const res = await ai.models.generateContent({
			model: "gemini-3.5-flash-lite",
			contents: "自己紹介してください",
		})

		return c.json({ text: res.text })
	})
	.route("/receipt", receiptApi)

export type ApiType = typeof api
