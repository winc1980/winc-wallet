import { pgTable, text, uuid } from "drizzle-orm/pg-core"
import { authUser } from "./auth"

export const usersTable = pgTable("users", {
	id: uuid("id")
		.primaryKey()
		.references(() => authUser.id),
	name: text("name").notNull(),
})
