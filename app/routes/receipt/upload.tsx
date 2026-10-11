import { LoaderCircleIcon } from "lucide-react"
import { useEffect } from "react"
import { Form, useNavigation } from "react-router"
import { getClientApiClient } from "~app/lib/api"
import type { Route } from "./+types/upload"

export default function ReceiptUploadPage({
	actionData,
}: Route.ComponentProps) {
	const navigation = useNavigation()
	useEffect(() => {
		if (actionData) {
			console.log(actionData)
		}
	}, [actionData])
	return (
		<div>
			<Form method="post" encType="multipart/form-data">
				<input className="border" type="file" name="receipt-images" multiple />
				<input type="submit" value="送信" />
				{navigation.state === "submitting" && (
					<LoaderCircleIcon className="animate-spin" />
				)}
			</Form>
		</div>
	)
}

export async function clientAction({
	context,
	request,
}: Route.ClientActionArgs) {
	console.log(context)
	const formData = await request.formData()
	const files = formData.getAll("receipt-images")
	const client = getClientApiClient()

	const promises = files.map(async (file) => {
		if (!(file instanceof File)) {
			return { success: false, error: "無効な形式" }
		}

		const { uploadUrl, id } = await client.receipt.upload
			.$post()
			.then((res) => res.json())

		const put = await fetch(uploadUrl, {
			method: "PUT",
			headers: { "Content-Type": "image/jpeg" },
			body: file,
		})

		if (!put.ok) {
			return { success: false, error: "R2へのfetchに失敗" }
		}

		return { success: true, id }
	})

	return { result: await Promise.all(promises) }
}
