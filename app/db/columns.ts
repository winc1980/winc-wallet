import { uuid } from "drizzle-orm/pg-core"

export const primaryKey = (name = "id") =>
	uuid(name).primaryKey().defaultRandom()
