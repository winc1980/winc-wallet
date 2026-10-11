import type { DB } from "~app/db/types"

export type ApiEnv = {
	Bindings: CloudflareBindings
	Variables: {
		db: DB
	}
}
