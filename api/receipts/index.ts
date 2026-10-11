import { GoogleGenAI } from "@google/genai"
import { Hono } from "hono"
import * as z from "zod"
import type { ApiEnv } from "~api/types"
import { receiptImagesTable } from "~app/db/schema"
import uploadApi from "./upload"

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

export default new Hono<ApiEnv>()
	.post("/", async (c) => {
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
	})
	.get("/", async (c) => {
		const db = c.get("db")
		const ids = await db
			.select({ id: receiptImagesTable.uuid })
			.from(receiptImagesTable)
		const r2 = c.get("r2")
		const urlPromises: Promise<string>[] = []

		for (const { id } of ids) {
			const url = new URL(
				`https://${c.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${c.env.R2_BUCKET_NAME}/images/${id}.jpg`,
			)
			url.searchParams.set("X-Amz-Expires", "3600")
			const signedUrl = r2
				.sign(new Request(url), { aws: { signQuery: true } })
				.then((signed) => signed.url)
			urlPromises.push(signedUrl)
		}

		return c.json({ urls: await Promise.all(urlPromises) })
	})
	.route("/", uploadApi)
