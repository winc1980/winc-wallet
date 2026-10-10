import { GoogleGenAI } from "@google/genai"
import { Hono } from "hono"
import * as z from "zod"

const receiptDataSchema = z.object({
	shopName: z.string(),
	time: z.number(),
	items: z.array(
		z.object({
			name: z.string(),
			price: z.number(),
		}),
	),
	subtotal: z.number(),
	total: z.number(),
})

const ocrResultSchema = z.discriminatedUnion("success", [
	z.object({
		success: z.literal(true),
		data: receiptDataSchema,
	}),
	z.object({
		success: z.literal(false),
		reason: z.string(),
	}),
])

export default new Hono<{ Bindings: CloudflareBindings }>().post(
	"/",
	async (c) => {
		const formData = await c.req.formData()
		const files = formData.getAll("receipt-images")

		const ai = new GoogleGenAI({ apiKey: c.env.GEMINI_API_KEY })

		const promises = files.map(async (file, index) => {
			if (!(file instanceof File)) {
				console.log("ファイルの形式が異なります")
				return null
			}

			console.log(`${index}: バッファに変換しています...`)
			const buffer = Buffer.from(await file.arrayBuffer())
			const base64 = buffer.toString("base64")
			console.log(`${index}: AIに送信しています...`)
			const result = await ai.models.generateContent({
				model: "gemini-3.5-flash-lite",
				contents: [
					{ inlineData: { mimeType: "image/jpeg", data: base64 } },
					{
						text: "このレシートから情報を抽出して。もし読み込めなかったら日本語でエラー理由を出して",
					},
				],
				config: {
					responseMimeType: "application/json",
					responseJsonSchema: z.toJSONSchema(ocrResultSchema),
				},
			})
			console.log(`${index}: パースをしています...`)
			const raw = JSON.parse(result.text ?? "")
			const parseResult = z.safeParse(ocrResultSchema, raw)
			if (!parseResult.success) {
				console.log("出力の形式が違います")
				return null
			}

			return parseResult.data
		})

		const data = (await Promise.all(promises)).filter((data) => data !== null)

		return c.json({ success: false, data })
	},
)
