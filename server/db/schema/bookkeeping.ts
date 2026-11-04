import { sql } from "drizzle-orm"
import {
	boolean,
	check,
	integer,
	pgEnum,
	pgTable,
	text,
	uuid,
} from "drizzle-orm/pg-core"
import { createdAt, primaryKey } from "../columns"
import { organizationsTable } from "./organizations"

/**
 * `assets`: 資産
 *
 * `liabilities`: 負債
 *
 * `equity`: 純資産
 *
 * `income`: 収益
 *
 * `expense`: 費用
 */
export const accountTypeEnum = pgEnum("account_type", [
	"assets",
	"liabilities",
	"equity",
	"income",
	"expense",
])

// 勘定科目
export const accountsTable = pgTable("accounts", {
	id: primaryKey(),
	name: text().notNull(),
	type: accountTypeEnum("type").notNull(),
})

// 仕訳
export const journalEntriesTable = pgTable("journal_entries", {
	id: primaryKey(),
	createdAt: createdAt(),
	eventId: uuid("event_id")
		.references(() => eventsTable.id)
		.notNull(),
})

// 仕訳の一行
export const journalLinesTable = pgTable(
	"journal_lines",
	{
		id: primaryKey(),
		entryId: uuid("entry_id")
			.references(() => journalEntriesTable.id)
			.notNull(),
		accountId: uuid("account_id")
			.references(() => accountsTable.id)
			.notNull(),
		amount: integer().notNull(),
	},
	(table) => [check("amount_nonzero_check", sql`${table.amount} <> 0`)],
)

// イベント
export const eventsTable = pgTable("events", {
	id: primaryKey(),
	name: text().notNull().default("default"),
	organizationId: uuid("organization_id")
		.references(() => organizationsTable.id)
		.notNull(),
	createdAt: createdAt(),
	default: boolean().default(false).notNull(),
})
