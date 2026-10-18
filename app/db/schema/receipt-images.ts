import { pgEnum, pgTable, timestamp } from "drizzle-orm/pg-core"
import { primaryKey } from "../columns"

export const receiptImageStateEnum = pgEnum("state", ["uploading", "uploaded"])

export const receiptImagesTable = pgTable("receipt_images", {
	id: primaryKey(),
	state: receiptImageStateEnum("state").notNull().default("uploading"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.notNull()
		.$onUpdateFn(() => new Date()),
})
