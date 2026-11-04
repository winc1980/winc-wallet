import { reset } from "drizzle-seed"
import * as schema from "~server/db/schema"
import { createDb } from "./client"

async function main() {
	const { db } = await createDb(process.env.DATABASE_URL)
	console.log("created DB")
	await reset(db, schema)
	console.log("reset DB")
	// 組織追加
	const [organization] = await db
		.insert(schema.organizationsTable)
		.values({
			name: "早稲田情報技研・WINC",
		})
		.onConflictDoNothing()
		.returning()

	// デフォルトイベント作成
	const [defaultEvent] = await db
		.insert(schema.eventsTable)
		.values({
			organizationId: organization!.id,
			default: true,
		})
		.onConflictDoNothing()
		.returning()
	// 主要な勘定科目追加
	const [cash, circleDue] = await db
		.insert(schema.accountsTable)
		.values([
			{
				name: "現金",
				type: "assets",
				eventId: defaultEvent!.id,
			},
			{
				name: "部費",
				type: "income",
				eventId: defaultEvent!.id,
			},
		])
		.onConflictDoNothing()
		.returning()
	// サンプルの仕訳を追加
	await db.transaction(async (tx) => {
		const [entry] = await tx
			.insert(schema.journalEntriesTable)
			.values({
				eventId: defaultEvent!.id,
			})
			.onConflictDoNothing()
			.returning()
		await tx
			.insert(schema.journalLinesTable)
			.values([
				{
					accountId: cash!.id,
					amount: 100000,
					entryId: entry!.id,
				},
				{
					accountId: circleDue!.id,
					amount: -100000,
					entryId: entry!.id,
				},
			])
			.onConflictDoNothing()
	})

	console.log("inserted DB")
}

await main()
process.exit(0)
