import { redirect } from "react-router"
import { authContext } from "~app/lib/context"
import type { Route } from "./+types"

export async function loader({ request, context }: Route.LoaderArgs) {
	const auth = context.get(authContext)
	const session = await auth.api.getSession({ headers: request.headers })
	if (session) throw redirect("/auth/login")
	throw redirect("/auth/register")
}
