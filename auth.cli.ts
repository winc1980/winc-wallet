import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { drizzle } from "drizzle-orm/node-postgres"
import { Client } from "pg"
import { authOptions } from "~app/lib/auth/option"

export const auth = betterAuth({
	...authOptions,
	database: drizzleAdapter(
		drizzle(new Client({ connectionString: process.env.DATABASE_URL })),
		{ provider: "pg" },
	),
})
