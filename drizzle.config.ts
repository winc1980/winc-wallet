// packages/db/drizzle.config.ts
import { defineConfig } from "drizzle-kit"

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL)
	throw new Error("環境変数「DATABASE_URL」が設定されていません")

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/schema",
	out: "./migrations",
	dbCredentials: { url: DATABASE_URL },
})
