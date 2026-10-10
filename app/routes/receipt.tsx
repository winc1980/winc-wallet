import { LoaderCircleIcon } from "lucide-react"
import { Form, useNavigation } from "react-router"
import { getApiClient } from "~app/lib/api"
import type { Route } from "./+types/receipt"

export default function ReceiptPage({ actionData }: Route.ComponentProps) {
	const navigation = useNavigation()
	return (
		<div>
			<Form method="post" encType="multipart/form-data">
				<input className="border" type="file" name="receipt-image" multiple />
				<input type="submit" value="送信" />
				{navigation.state === "submitting" && (
					<LoaderCircleIcon className="animate-spin" />
				)}
			</Form>
			{actionData &&
				(actionData.success ? (
					<pre>{JSON.stringify(actionData.data, null, 2)}</pre>
				) : (
					<div className="text-red-500">{actionData.error}</div>
				))}
		</div>
	)
}

export async function action({ request, context }: Route.ActionArgs) {
	const formData = await request.formData()
	const files = formData.getAll("receipt-image")
	if (files.some((file) => !(file instanceof File))) {
		return { success: false as const, error: "ファイルが選択されていません" }
	}

	const client = getApiClient(context)
	const response = await client.receipt
		.$post({
			form: { "receipt-images": files as File[] },
		})
		.then((res) => res.json())

	if (response.success) {
		return { success: false as const, error: "サーバーエラー" }
	}

	return { success: true as const, data: response.data }
}
