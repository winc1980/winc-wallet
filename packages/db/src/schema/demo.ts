import { integer, pgTable, varchar } from "drizzle-orm/pg-core"

export const primaryKey = () =>
	integer("id").primaryKey().generatedAlwaysAsIdentity()

export const usersTable = pgTable("users", {
	id: primaryKey(),
	name: varchar().notNull(),
	age: integer().notNull(),
	email: varchar().notNull().unique(),
})
