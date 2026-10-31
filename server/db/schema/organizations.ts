import { pgTable, text, uuid } from "drizzle-orm/pg-core"
import { primaryKey } from "../columns"
import { authUser } from "./auth"

export const organizationsTable = pgTable("organizations", {
	id: primaryKey(),
	name: text().notNull(),
})

export const organizationMembersTable = pgTable("organization_members", {
	id: primaryKey(),
	organizationId: uuid("organization_id")
		.references(() => organizationsTable.id)
		.notNull(),
	userId: uuid("user_id")
		.references(() => authUser.id)
		.notNull(),
})
