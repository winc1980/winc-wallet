import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { PanelLeftIcon } from "lucide-react"
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
	return (
		<div className="h-dvh overflow-y-auto">
			<div className="sticky top-0 left-0 right-0 h-16 flex items-center">
				<div className="size-16 p-2">
					<ButtonPrimitive className="size-12 p-3 rounded-full transition-colors active:bg-secondary-container">
						<PanelLeftIcon />
					</ButtonPrimitive>
				</div>
			</div>
			<div className="px-4 py-6 space-y-6">
				<h1>{organization.name}</h1>
			</div>
		</div>
	)
}
