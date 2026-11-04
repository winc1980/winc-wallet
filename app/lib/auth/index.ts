import { drizzleAdapter } from "@better-auth/drizzle-adapter"
import { betterAuth } from "better-auth"
import { usersTable } from "~server/db/schema/user"
import type { DB } from "~server/db/types"
import { authOptions } from "./option"

export function createAuth(db: DB, env: { secret: string; baseURL: string }) {
	return betterAuth({
		...authOptions,
		trustedOrigins: ["http://192.168.0.58:5173"],
		database: drizzleAdapter(db, { provider: "pg" }),
		secret: env.secret,
		baseURL: env.baseURL,
		databaseHooks: {
			user: {
				create: {
					async after(user) {
						await db
							.insert(usersTable)
							.values({
								id: user.id,
								name: user.name,
							})
							.onConflictDoNothing()
					},
				},
			},
		},
	})
}
