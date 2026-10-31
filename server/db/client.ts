// packages/db/src/client.ts
import { drizzle } from "drizzle-orm/node-postgres"
import { Client } from "pg"
import * as schema from "./schema"

/**
 * 使い方
 *
 * ```typescript
 * const { db, close } = await createDb(c.env.HYPERDRIVE).connectionString
 * ```
 */
export const createDb = async (connectionString: string) => {
	const client = new Client({ connectionString })
	await client.connect()
	return {
		db: drizzle(client, { schema }),
		close: () => client.end(),
	}
}
