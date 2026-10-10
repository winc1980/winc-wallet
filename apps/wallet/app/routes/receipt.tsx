import { LoaderCircleIcon } from "lucide-react"
import { Form, useNavigation } from "react-router"
import { getApiClient } from "~/lib/api"
import type { Route } from "./+types/receipt"

export default function ReceiptPage({ actionData }: Route.ComponentProps) {
	const navigation = useNavigation()
	return (
		<div>
			{navigation.state === "submitting" && (
				<LoaderCircleIcon className="animate-spin" />
			)}
			<Form method="post" encType="multipart/form-data">
				<input className="border" type="file" name="receipt-image" />
				<input className="border" type="submit" value="送信" />
			</Form>
			{actionData && !actionData.success && (
				<div className="text-red-500">{actionData.error}</div>
			)}
			{actionData?.success && <div>{actionData.text}</div>}
		</div>
	)
}

export async function action({ context, request }: Route.ActionArgs) {
	const formData = await request.formData()
	const file = formData.get("receipt-image")
	if (!(file instanceof File)) {
		return { success: false, error: "ファイルが選択されていません" }
	}
	const client = getApiClient(context)
	const response = await client["analyze-receipt"]
		.$post({
			form: { "receipt-image": file },
		})
		.then(async (res) => await res.json())
	if (response.success) {
		console.log(response)
		return { success: true, text: response.text }
	}
	return { success: false, error: response.error }
}
