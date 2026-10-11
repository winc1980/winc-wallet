import { zValidator } from "@hono/zod-validator"
import { AwsClient } from "aws4fetch"
import { eq } from "drizzle-orm"
import { Hono } from "hono"
import * as z from "zod"
import { createDb } from "~app/db/client"
import { receiptImagesTable } from "~app/db/schema"

export default new Hono<{ Bindings: CloudflareBindings }>()
	.post("/upload", async (c) => {
		const id = crypto.randomUUID()

		const key = `images/${id}.jpg`

		const r2 = new AwsClient({
			accessKeyId: c.env.R2_ACCESS_KEY_ID,
			secretAccessKey: c.env.R2_SECRET_ACCESS_KEY,
		})

		const url = new URL(
			`https://${c.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${c.env.R2_BUCKET_NAME}/${key}`,
		)

		url.searchParams.set("X-Amz-Expires", "600")

		const signed = await r2.sign(url, {
			method: "PUT",
			headers: { "Content-Type": "image/jpeg" },
			aws: { signQuery: true, allHeaders: true },
		})

		const { db } = await createDb(c.env.HYPERDRIVE.connectionString)
		await db.insert(receiptImagesTable).values({ uuid: id, state: "uploading" })

		return c.json({ id, uploadUrl: signed.url })
	})
	.post(
		"/upload/:id/complete",
		zValidator("param", z.object({ id: z.uuid() })),
		async (c) => {
			const { db } = await createDb(c.env.HYPERDRIVE.connectionString)
			await db
				.update(receiptImagesTable)
				.set({ state: "uploaded" })
				.where(eq(receiptImagesTable.uuid, c.req.valid("param").id))
			return c.json({ success: true })
		},
	)
