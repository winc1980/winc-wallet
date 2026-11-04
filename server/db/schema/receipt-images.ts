import { pgEnum, pgTable } from "drizzle-orm/pg-core"
import { createdAt, primaryKey, updatedAt } from "../columns"

export const receiptImageStateEnum = pgEnum("state", ["uploading", "uploaded"])

export const receiptImagesTable = pgTable("receipt_images", {
	id: primaryKey(),
	state: receiptImageStateEnum("state").notNull().default("uploading"),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
})
