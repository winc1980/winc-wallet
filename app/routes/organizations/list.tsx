import { redirect } from "react-router"
import { getApiClient } from "~app/lib/route-modules/api"
import { getSession } from "~app/lib/route-modules/session"
import type { Route } from "./+types/list"

export async function loader({ context, request }: Route.LoaderArgs) {
	const api = getApiClient(context)
	const session = await getSession(context, request)
	if (!session) throw redirect("/auth/login")
	const organizations = await api.users[":userId"].organizations
		.$get({
			param: { userId: session.user.id },
		})
		.then((res) => res.json())
	return { organizations }
}

export default function OrganizationListPage({
	loaderData: { organizations },
}: Route.ComponentProps) {
	return (
		<div>
			<h1>Organization List</h1>

			<pre>{JSON.stringify(organizations, null, 2)}</pre>
		</div>
	)
}
