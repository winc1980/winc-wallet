import { apiClientContext } from "~app/lib/middlewares/api-client-middleware"
import type { Route } from "./+types/list"

export async function loader({ context }: Route.LoaderArgs) {
	const api = context.get(apiClientContext)
	const data = await api.receipts.$get().then((res) => res.json())
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
