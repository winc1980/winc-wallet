import { data } from "react-router"
import { apiClientContext } from "~app/lib/middlewares/api-client-middleware"
import { redirectError } from "~app/lib/route-modules/redirect-error"
import { commitSession, getCookieSession } from "~app/lib/session"
import type { Route } from "./+types/home"

export async function loader({ context, params, request }: Route.LoaderArgs) {
	const api = context.get(apiClientContext)
	const res = await api.organizations[":organizationId"].$get({
		param: { organizationId: params.organizationId },
	})

	const cookie = await getCookieSession(request)
	if (!res.ok) return await redirectError(res, cookie)

	const { organization } = await res.json()
	cookie.set("lastOrganizationId", organization.id)

	return data(
		{ organization },
		{ headers: { "Set-Cookie": await commitSession(cookie) } },
	)
}

export default function OrganizationHomePage({
	loaderData: { organization },
}: Route.ComponentProps) {
	return <div>Home Page: {organization.id}</div>
}
