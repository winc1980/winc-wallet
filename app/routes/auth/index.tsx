import { Button, Field, Form } from "@base-ui/react"
import { LoaderCircleIcon } from "lucide-react"
import { Form as ReactRouterForm, redirect, useNavigation } from "react-router"
import * as z from "zod"
import { CommonLayout } from "~app/components/layout/common-layout"
import { authErrorToFormErrors } from "~app/db/schema/errors"
import { authClient } from "~app/lib/auth/client"
import { MIN_PASSWORD_LENGTH } from "~app/lib/auth/option"
import { toZenkakuNum } from "~app/utils/display-formatter"
import type { Route } from "./+types"

const formSchema = z.object({
	name: z.string().min(2, { error: "２文字以上で設定してください" }).nonempty(),
	email: z.email({ error: "無効な形式のメールアドレスです" }).nonempty(),
	password: z.string().min(MIN_PASSWORD_LENGTH, {
		error: `${toZenkakuNum(MIN_PASSWORD_LENGTH)}文字以上で設定してください`,
	}),
})

export default function AuthPage({ actionData }: Route.ComponentProps) {
	const navigation = useNavigation()
	return (
		<CommonLayout>
			<Form
				render={<ReactRouterForm method="POST" />}
				errors={actionData?.fieldErrors}
				className="flex flex-col gap-2"
			>
				<Field.Root name="name" className="flex flex-col">
					<Field.Label>アカウント名</Field.Label>
					<Field.Control type="text" required className="border outline-none" />
					<Field.Error className="text-red-500" />
				</Field.Root>
				<Field.Root name="email" className="flex flex-col">
					<Field.Label>メールアドレス</Field.Label>
					<Field.Control
						type="email"
						required
						className="border outline-none"
					/>
					<Field.Error className="text-red-500" />
				</Field.Root>
				<Field.Root name="password" className="flex flex-col">
					<Field.Label>パスワード</Field.Label>
					<Field.Control
						type="password"
						required
						className="border outline-none"
					/>
					<Field.Error className="text-red-500" />
				</Field.Root>
				{actionData?.formError && (
					<div className="text-red-500">{actionData.formError}</div>
				)}
				<Button
					type="submit"
					disabled={navigation.state === "submitting"}
					className="flex gap-1"
				>
					{navigation.state === "submitting" && (
						<LoaderCircleIcon className="animate-spin" />
					)}
					送信
				</Button>
			</Form>
		</CommonLayout>
	)
}

export async function clientAction({ request }: Route.ClientActionArgs) {
	const input = Object.fromEntries(await request.formData())
	const parseResult = z.safeParse(formSchema, input)
	if (!parseResult.success)
		return { fieldErrors: z.flattenError(parseResult.error).fieldErrors }

	const { error } = await authClient.signUp.email(parseResult.data)
	console.log(error)
	if (error) return { ...authErrorToFormErrors(error) }

	return redirect("/")
}
