// packages/db/src/client.ts
import { drizzle } from "drizzle-orm/node-postgres"
import { Client } from "pg"
import * as schema from "./schema"

export const createDb = async (connectionString: string) => {
	const client = new Client({ connectionString })
	await client.connect()
	return {
		db: drizzle(client, { schema }),
		close: () => client.end(),
	}
}
