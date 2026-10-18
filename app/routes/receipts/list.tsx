import { getApiClient } from "~app/lib/route-modules/api"
import type { Route } from "./+types/list"

export async function loader({ context }: Route.LoaderArgs) {
	const client = getApiClient(context)
	const data = await client.receipts.$get().then((res) => res.json())
	return data
}

export default function ReceiptsListPage({
	loaderData: { urls },
}: Route.ComponentProps) {
	return (
		<div>
			{urls.map((url) => (
				<img src={url} key={url} alt="レシートの画像" />
			))}
		</div>
	)
}
