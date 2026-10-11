import { pgTable, uuid } from "drizzle-orm/pg-core"

export const receiptImagesTable = pgTable("receipt_images", {
	uuid: uuid().primaryKey(),
})
