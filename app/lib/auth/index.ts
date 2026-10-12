import { drizzleAdapter } from "@better-auth/drizzle-adapter"
import { betterAuth } from "better-auth"
import type { DB } from "~app/db/types"
import { authOptions } from "./option"

export function createAuth(db: DB, env: { secret: string; baseURL: string }) {
	return betterAuth({
		...authOptions,
		database: drizzleAdapter(db, { provider: "pg" }),
		secret: env.secret,
		baseURL: env.baseURL,
	})
}
