import { Button, Field, Form } from "@base-ui/react"
import { Form as RouterForm, redirect, useNavigation } from "react-router"
import * as z from "zod"
import { SmallBoxLayout } from "~app/components/layout/common-layout"
import { authErrorToFormErrors } from "~app/db/schema/errors"
import { authClient } from "~app/lib/auth/client"
import { MIN_PASSWORD_LENGTH } from "~app/lib/auth/option"
import { cn } from "~app/utils/cn"
import { toZenkakuNum } from "~app/utils/display-formatter"
import type { Route } from "./+types/register"

const formSchema = z.object({
	name: z.string().min(2, { error: "２文字以上で設定してください" }).nonempty(),
	email: z.email({ error: "無効な形式のメールアドレスです" }).nonempty(),
	password: z.string().min(MIN_PASSWORD_LENGTH, {
		error: `${toZenkakuNum(MIN_PASSWORD_LENGTH)}文字以上で設定してください`,
	}),
})

export default function RegisterPage({ actionData }: Route.ComponentProps) {
	const navigation = useNavigation()
	return (
		<SmallBoxLayout className="flex flex-col gap-6">
			<h1 className="font-bold">新規登録</h1>
			<Form
				render={<RouterForm method="POST" />}
				errors={actionData?.fieldErrors}
				className="space-y-6"
			>
				<fieldset className="space-y-4">
					<Field.Root name="name" className="flex flex-col gap-1">
						<Field.Label>アカウント名</Field.Label>
						<Field.Control
							type="text"
							required
							className="bg-bg-muted outline-none px-4 py-2"
						/>
						<Field.Error className="text-destructive" />
					</Field.Root>
					<Field.Root name="email" className="flex flex-col gap-1">
						<Field.Label>メールアドレス</Field.Label>
						<Field.Control
							type="email"
							required
							className="bg-bg-muted outline-none px-4 py-2"
						/>
						<Field.Error className="text-destructive" />
					</Field.Root>
					<Field.Root name="password" className="flex flex-col gap-1">
						<Field.Label>パスワード</Field.Label>
						<Field.Control
							type="password"
							required
							className="bg-bg-muted outline-none px-4 py-2"
						/>
						<Field.Error className="text-destructive" />
					</Field.Root>
				</fieldset>
				<div className="flex flex-col md:items-end-safe mt-8">
					<Button
						type="submit"
						disabled={navigation.state === "submitting"}
						className={cn(
							"border flex items-center justify-center px-4 py-2 transition-colors bg-bg text-fg",
							"hover:bg-bg-active hover:text-fg-active",
							"disabled:text-fg-disabled disabled:bg-bg-disabled",
						)}
					>
						登録
					</Button>
				</div>
			</Form>
		</SmallBoxLayout>
	)
}

export async function clientAction({ request }: Route.ClientActionArgs) {
	const input = Object.fromEntries(await request.formData())
	const parseResult = z.safeParse(formSchema, input)
	if (!parseResult.success)
		return { fieldErrors: z.flattenError(parseResult.error).fieldErrors }

	const { error: authError } = await authClient.signUp.email(parseResult.data)
	if (authError) return { ...authErrorToFormErrors(authError) }

	return redirect("/auth/login")
}
