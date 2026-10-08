import youtubeIcon from "~/assets/youtube-icon.png"
import { getApiClient } from "~/lib/api"
import type { Route } from "./+types/home"

export async function loader({ context }: Route.LoaderArgs) {
	const client = getApiClient(context)
	const data = await client.index.$get().then((res) => res.json())
	return { data }
}

export default function HomePage({
	loaderData: { data },
}: Route.ComponentProps) {
	return (
		<div>
			<div>{data.message}</div>
			<img src={youtubeIcon} alt="YouTubeのアイコン" />
		</div>
	)
}
