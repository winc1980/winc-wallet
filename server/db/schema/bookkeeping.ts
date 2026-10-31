import { sql } from "drizzle-orm"
import {
	check,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core"
import { primaryKey } from "../columns"

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

export const accountsTable = pgTable("accounts", {
	id: primaryKey(),
	name: text().notNull(),
})

export const journalEntriesTable = pgTable("journal_entries", {
	id: primaryKey(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
})

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
		partyId: text(),
		amount: integer().notNull(),
	},
	(table) => [check("amount_nonzero_check", sql`${table.amount} <> 0`)],
)

export const eventsTable = pgTable("events", {})
