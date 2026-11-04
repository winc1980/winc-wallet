import { redirect } from "react-router"
import { apiClientContext } from "~app/lib/middlewares/api-client-middleware"
import { sessionContext } from "~app/lib/middlewares/auth-middleware"
import type { Route } from "./+types/list"

export async function loader({ context }: Route.LoaderArgs) {
	const api = context.get(apiClientContext)
	const session = context.get(sessionContext)
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
