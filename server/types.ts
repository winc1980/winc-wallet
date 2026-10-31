import type { AwsClient } from "aws4fetch"
import type { createAuth } from "~app/lib/auth"
import type { DB } from "./db/types"

export type ApiEnv = {
	Bindings: CloudflareBindings
	Variables: {
		db: DB
		r2: AwsClient
		auth: ReturnType<typeof createAuth>
	}
}
