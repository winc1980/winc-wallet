import youtubeImage from "~app/assets/youtube-icon.png"
import { getApiClient } from "~app/lib/api"
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
			<img src={youtubeImage} alt="YouTubeのアイコン" />
		</div>
	)
}
