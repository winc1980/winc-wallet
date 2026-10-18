import { Button, Field, Form } from "@base-ui/react"
import { Form as RouterForm, redirect } from "react-router"
import * as z from "zod"
import { SmallBoxLayout } from "~app/components/layout/common-layout"
import { useIsFormLoading } from "~app/hooks/use-is-form-loading"
import { authClient } from "~app/lib/auth/client"
import { MIN_PASSWORD_LENGTH } from "~app/lib/auth/option"
import { cn } from "~app/utils/cn"
import { toZenkakuNum } from "~app/utils/display-formatter"
import { authErrorToFormErrors } from "~app/utils/form-errors"
import type { Route } from "./+types/login"

const formSchema = z.object({
	email: z.email({ error: "無効な形式のメールアドレスです" }).nonempty(),
	password: z.string().min(MIN_PASSWORD_LENGTH, {
		error: `${toZenkakuNum(MIN_PASSWORD_LENGTH)}文字以上で設定してください`,
	}),
})

export default function LoginPage({ actionData }: Route.ComponentProps) {
	const isLoading = useIsFormLoading()
	return (
		<SmallBoxLayout className="flex flex-col gap-6">
			<h1 className="font-bold">ログイン</h1>
			<Form
				render={<RouterForm method="POST" />}
				errors={actionData?.fieldErrors}
				className="space-y-6"
			>
				<fieldset className="space-y-4">
					<Field.Root name="email" className="flex flex-col gap-1">
						<Field.Label>メールアドレス</Field.Label>
						<Field.Control type="email" required className="input-text" />
						<Field.Error className="text-destructive" />
					</Field.Root>
					<Field.Root name="password" className="flex flex-col gap-1">
						<Field.Label>パスワード</Field.Label>
						<Field.Control type="password" required className="input-text" />
						<Field.Error className="text-destructive" />
					</Field.Root>
				</fieldset>
				{actionData?.formError && (
					<div className="text-destructive">{actionData.formError}</div>
				)}
				<div className="flex flex-col md:items-end-safe mt-8">
					<Button
						type="submit"
						disabled={isLoading}
						className={cn(
							"box box-interactive flex items-center justify-center px-4 py-2",
						)}
					>
						ログイン
					</Button>
				</div>
			</Form>
		</SmallBoxLayout>
	)
}

export async function clientAction({
	request,
}: Route.ClientActionArgs): Promise<{
	fieldErrors: { email?: string[]; password?: string[] }
	formError?: string
}> {
	const input = Object.fromEntries(await request.formData())
	const parseResult = z.safeParse(formSchema, input)
	if (!parseResult.success)
		return { fieldErrors: z.flattenError(parseResult.error).fieldErrors }

	const { error: authError } = await authClient.signIn.email(parseResult.data)
	if (authError) return { ...authErrorToFormErrors(authError) }

	throw redirect("/")
}
