import type { AwsClient } from "aws4fetch"
import type { DB } from "~app/db/types"

export type ApiEnv = {
	Bindings: CloudflareBindings
	Variables: {
		db: DB
		r2: AwsClient
	}
}
