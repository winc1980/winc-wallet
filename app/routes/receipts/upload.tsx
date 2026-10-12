import { LoaderCircleIcon } from "lucide-react"
import { useEffect } from "react"
import { Form, useNavigation } from "react-router"
import { ImageInput } from "~app/components/featured/image-input"
import { getClientApiClient } from "~app/lib/api"
import { promiseToResult } from "~app/utils/promise-helper"
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
				<ImageInput
					className="border"
					name="receipt-images"
					capture="environment"
					multiple
				/>
				<input type="submit" value="送信" />
				{navigation.state === "submitting" && (
					<LoaderCircleIcon className="animate-spin" />
				)}
			</Form>
		</div>
	)
}

export async function clientAction({ request }: Route.ClientActionArgs) {
	const formData = await request.formData()
	const files = formData.getAll("receipt-images")
	const client = getClientApiClient()

	const promises = files.map(async (file) => {
		if (!(file instanceof File)) {
			return { success: false as const, error: "無効な形式" }
		}

		const uploadResult = await promiseToResult(
			client.receipts.upload.$post().then((res) => res.json()),
		)

		if (!uploadResult.success) {
			return uploadResult
		}

		const put = await fetch(uploadResult.data.uploadUrl, {
			method: "PUT",
			headers: { "Content-Type": "image/jpeg" },
			body: file,
		})

		if (!put.ok) {
			return { success: false as const, error: "R2へのfetchに失敗" }
		}

		const uploadCompletionResult = await promiseToResult(
			client.receipts.upload[":id"].complete.$post({
				param: { id: uploadResult.data.id },
			}),
		)
		if (!uploadCompletionResult.success) {
			return uploadCompletionResult
		}

		return { success: true as const, id: uploadResult.data.id }
	})

	return { result: await Promise.all(promises) }
}
