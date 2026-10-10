import type { GeneratedBindings } from "@wallet/app/types"
import { dbApi } from "@wallet/db"
import { Hono } from "hono"

export const api = new Hono<{ Bindings: GeneratedBindings }>()
	.get("/", (c) => c.json({ message: "hello from hono api route" }))
	.get("/llm-agreement", async (c) => {
		await c.env.AI.run("@cf/meta/llama-3.2-11b-vision-instruct", {
			prompt: "agree",
		})
		return c.json({ success: true }, 200)
	})
	.post("/analyze-receipt", async (c) => {
		const formData = await c.req.formData()
		const file = formData.get("receipt-image")
		if (!(file instanceof File)) {
			return c.json(
				{ success: false, error: "フォームデータの形式が異なります" },
				400,
			)
		}
		let base64: string
		try {
			const buffer = Buffer.from(await file.arrayBuffer())
			base64 = buffer.toString("base64")
		} catch (e) {
			console.error(e)
			return c.json(
				{
					success: false,
					error: "base64に変換できませんでした",
				},
				400,
			)
		}
		const result = await c.env.AI.run(
			"@cf/meta/llama-3.2-11b-vision-instruct",
			{
				messages: [
					{ role: "system", content: "レシートから情報を抽出する" },
					{ role: "user", content: "このレシートを読み取って" },
				],
				image: base64,
			},
		)
		return c.json({ success: true, text: result.response ?? "データなし" })
	})
	.route("/", dbApi)
