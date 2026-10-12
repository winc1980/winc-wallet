import type { authClient } from "~app/lib/auth/client"

type AuthErrorCode = keyof typeof authClient.$ERROR_CODES
type FieldName = "name" | "email" | "password"

type ErrorRule = { field: FieldName | null; message: string }

const rules: Partial<Record<AuthErrorCode, ErrorRule>> = {
	USER_ALREADY_EXISTS: {
		field: "email",
		message: "このユーザーはすでに存在しています",
	},
	USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: {
		field: "email",
		message:
			"このユーザーはすでに存在しています。別のメールアドレスを使用してください",
	},
}

export type FormErrors = {
	fieldErrors: Partial<Record<FieldName, string[]>>
	formError?: string
}

export function authErrorToFormErrors(error: {
	code?: string
	status: number
}): FormErrors {
	if (error.status === 429) {
		return {
			fieldErrors: {},
			formError: "試行回数が多すぎます。しばらく待ってからお試しください",
		}
	}

	const rule =
		error.code && Object.hasOwn(rules, error.code)
			? rules[error.code as AuthErrorCode]
			: undefined

	if (!rule) {
		return {
			fieldErrors: {},
			formError: "エラーが発生しました。時間をおいて再度お試しください",
		}
	}

	return rule.field
		? { fieldErrors: { [rule.field]: [rule.message] } }
		: { fieldErrors: {}, formError: rule.message }
}
