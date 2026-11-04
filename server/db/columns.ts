import { timestamp, uuid } from "drizzle-orm/pg-core"

export const primaryKey = (name = "id") =>
	uuid(name).primaryKey().defaultRandom()

export const createdAt = (name = "createdAt") =>
	timestamp(name).defaultNow().notNull()

export const updatedAt = (name = "updatedAt") =>
	timestamp(name)
		.defaultNow()
		.notNull()
		.$onUpdateFn(() => new Date())
