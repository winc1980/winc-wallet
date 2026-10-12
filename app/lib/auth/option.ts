import type { BetterAuthOptions } from "better-auth"

export const MIN_PASSWORD_LENGTH = 6

export const authOptions = {
	emailAndPassword: {
		enabled: true,
		minPasswordLength: MIN_PASSWORD_LENGTH,
	},
} satisfies BetterAuthOptions
