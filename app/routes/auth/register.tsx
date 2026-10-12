import { Button, Field, Form } from "@base-ui/react"
import { Form as RouterForm } from "react-router"
import * as z from "zod"
import { SmallFormLayout } from "~app/components/layout/common-layout"
import { MIN_PASSWORD_LENGTH } from "~app/lib/auth/option"
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
	return (
		<SmallFormLayout>
			<Form render={<RouterForm method="POST" />} className="space-y-4">
				<h2>ログイン</h2>
				<Field.Root name="name" className="flex flex-col">
					<Field.Label>アカウント名</Field.Label>
					<Field.Control
						type="text"
						required
						className="border outline-none px-4 py-2"
					/>
					<Field.Error className="text-destructive" />
				</Field.Root>
				<Field.Root name="email" className="flex flex-col">
					<Field.Label>メールアドレス</Field.Label>
					<Field.Control
						type="email"
						required
						className="border outline-none px-4 py-2"
					/>
					<Field.Error className="text-destructive" />
				</Field.Root>
				<Field.Root name="password" className="flex flex-col">
					<Field.Label>パスワード</Field.Label>
					<Field.Control
						type="password"
						required
						className="border outline-none px-4 py-2"
					/>
					<Field.Error className="text-destructive" />
				</Field.Root>
				<div className="flex flex-col md:items-end-safe mt-8">
					<Button
						type="submit"
						className="border flex items-center px-4 py-2 transition-colors hover:bg-black hover:text-white"
					>
						ログイン
					</Button>
				</div>
			</Form>
		</SmallFormLayout>
	)
}
