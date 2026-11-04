import { Field, Form } from "@base-ui/react"
import { ChevronLeftIcon } from "lucide-react"
import { useId } from "react"
import { Link, Form as RouterForm, redirect } from "react-router"
import * as z from "zod"
import { Button } from "~app/components/ui/button"
import { FieldError } from "~app/components/ui/field"
import { Input } from "~app/components/ui/input"
import { useIsFormLoading } from "~app/hooks/use-is-form-loading"
import { authClient } from "~app/lib/auth/client"
import { MIN_PASSWORD_LENGTH } from "~app/lib/auth/option"
import { toZenkakuNum } from "~app/utils/display-formatter"
import { authErrorToFormErrors } from "~app/utils/form-errors"
import type { Route } from "./+types/login"

export default function LoginPage({ actionData }: Route.ComponentProps) {
	const isLoading = useIsFormLoading()
	const formId = useId()
	return (
		<div className="relative h-dvh overflow-y-auto">
			{/* ヘッダー */}
			<div className="sticky top-0 left-0 right-0 h-16 flex items-center justify-start">
				<div className="size-16 p-2">
					<ChevronLeftIcon className="size-12 p-3 rounded-full transition-colors active:bg-secondary-container" />
				</div>
			</div>
			<Form
				render={<RouterForm method="POST" />}
				errors={actionData?.fieldErrors}
				className="flex flex-col gap-8 px-4 pt-16"
				id={formId}
			>
				<h1 className="font-bold text-4xl">ログイン</h1>
				<fieldset className="flex flex-col gap-6">
					<Field.Root name="email" className="flex flex-col gap-1">
						<Field.Label>メールアドレス</Field.Label>
						<Field.Control type="email" required render={<Input />} />
						<FieldError />
					</Field.Root>
					<Field.Root name="password" className="flex flex-col gap-1">
						<Field.Label>パスワード</Field.Label>
						<Field.Control type="password" required render={<Input />} />
						<FieldError />
					</Field.Root>
				</fieldset>
			</Form>
			{/* 画面下部 */}
			<div className="fixed bottom-0 left-0 right-0 p-4 flex flex-col gap-4">
				<Button
					variant="secondaryContainer"
					render={<Link to="/auth/register" replace />}
				>
					新規登録はこちら
				</Button>
				<Button
					variant="primary"
					type="submit"
					form={formId}
					disabled={isLoading}
				>
					ログイン
				</Button>
			</div>
		</div>
	)
}

const formSchema = z.object({
	email: z.email({ error: "無効な形式のメールアドレスです" }).nonempty(),
	password: z.string().min(MIN_PASSWORD_LENGTH, {
		error: `${toZenkakuNum(MIN_PASSWORD_LENGTH)}文字以上で設定してください`,
	}),
})

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
