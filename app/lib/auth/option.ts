import type { BetterAuthOptions } from "better-auth"

export const MIN_PASSWORD_LENGTH = 6

export const authOptions = {
	emailAndPassword: {
		enabled: true,
		minPasswordLength: MIN_PASSWORD_LENGTH,
	},
	user: { modelName: "authUser" },
	session: {
		modelName: "authSession",
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60, // ５分
		},
	},
	verification: { modelName: "authVerification" },
	account: { modelName: "authAccount" },
} satisfies BetterAuthOptions
