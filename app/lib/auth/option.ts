import type { BetterAuthOptions } from "better-auth"

export const MIN_PASSWORD_LENGTH = 6

export const authOptions = {
	emailAndPassword: {
		enabled: true,
		minPasswordLength: MIN_PASSWORD_LENGTH,
	},
	user: { modelName: "auth_user" },
	session: { modelName: "auth_session" },
	verification: { modelName: "auth_verification" },
	account: { modelName: "auth_account" },
} satisfies BetterAuthOptions
