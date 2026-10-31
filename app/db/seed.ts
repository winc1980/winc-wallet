import { reset } from "drizzle-seed"
import * as schema from "~app/db/schema"
import { createDb } from "./client"

const WINC_ID = "0bd436a9-a4e4-4ba0-b70c-5a562b0676c0"

async function main() {
	const { db } = await createDb(process.env.DATABASE_URL)
	console.log("created DB")
	await reset(db, schema)
	console.log("reset DB")
	await db
		.insert(schema.organizationsTable)
		.values({
			name: "早稲田情報技研・WINC",
			id: WINC_ID,
		})
		.onConflictDoNothing()
	console.log("inserted DB")
}

await main()
process.exit(0)
