import { pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core"

export const receiptImageStateEnum = pgEnum("state", ["uploading", "uploaded"])

export const receiptImagesTable = pgTable("receipt_images", {
	uuid: uuid().primaryKey(),
	state: receiptImageStateEnum("state").notNull().default("uploading"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.notNull()
		.$onUpdateFn(() => new Date()),
})
