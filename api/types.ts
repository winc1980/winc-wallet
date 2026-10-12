import type { AwsClient } from "aws4fetch"
import type { DB } from "~app/db/types"
import type { createAuth } from "~app/lib/auth"

export type ApiEnv = {
	Bindings: CloudflareBindings
	Variables: {
		db: DB
		r2: AwsClient
		auth: ReturnType<typeof createAuth>
	}
}
