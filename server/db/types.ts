import type { NodePgDatabase } from "drizzle-orm/node-postgres"
import type { Client } from "pg"
import type * as schema from "./schema"

export type DB = NodePgDatabase<typeof schema> & {
	$client: Client
}
