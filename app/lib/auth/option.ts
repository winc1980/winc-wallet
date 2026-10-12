import type { BetterAuthOptions } from "better-auth"

export const MIN_PASSWORD_LENGTH = 6

export const authOptions = {
	emailAndPassword: {
		enabled: true,
		minPasswordLength: MIN_PASSWORD_LENGTH,
	},
	user: { modelName: "authUser" },
	session: { modelName: "authSession" },
	verification: { modelName: "authVerification" },
	account: { modelName: "authAccount" },
} satisfies BetterAuthOptions
