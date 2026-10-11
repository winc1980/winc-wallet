import { AwsClient } from "aws4fetch"
import { createMiddleware } from "hono/factory"
import type { ApiEnv } from "~api/types"

export const r2Middleware = createMiddleware<ApiEnv>(async (c, next) => {
	const r2 = new AwsClient({
		accessKeyId: c.env.R2_ACCESS_KEY_ID,
		secretAccessKey: c.env.R2_SECRET_ACCESS_KEY,
	})
	c.set("r2", r2)
	await next()
})
