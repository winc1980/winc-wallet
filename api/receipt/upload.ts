import { AwsClient } from "aws4fetch"
import { Hono } from "hono"

export default new Hono<{ Bindings: CloudflareBindings }>().post(
	"/upload",
	async (c) => {
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

		// insert

		return c.json({ id, uploadUrl: signed.url })
	},
)
