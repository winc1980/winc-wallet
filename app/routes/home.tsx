import { authContext } from "~app/lib/context"
import type { Route } from "./+types/home"

export async function loader({ context, request }: Route.LoaderArgs) {
	const auth = context.get(authContext)
	const session = await auth.api.getSession({ headers: request.headers })
	return { session }
}

export default function HomePage({
	loaderData: { session },
}: Route.ComponentProps) {
	return (
		<div>
			<pre>{JSON.stringify(session, null, 2)}</pre>
		</div>
	)
}
