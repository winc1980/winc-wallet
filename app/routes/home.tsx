import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { ChevronRightIcon, PanelLeftIcon } from "lucide-react"
import { Link, redirect } from "react-router"
import { apiClientContext } from "~app/lib/middlewares/api-client-middleware"
import { redirectError } from "~app/lib/route-modules/redirect-error"
import { commitSession, getCookieSession } from "~app/lib/session"
import type { Route } from "./+types/home"

export async function loader({ context, request }: Route.LoaderArgs) {
	const api = context.get(apiClientContext)
	const res = await api.organizations.me.$get()
	const cookie = await getCookieSession(request)

	if (!res.ok) return await redirectError(res, cookie)

	const { organizations } = await res.json()
	console.log(organizations)

	// 少なくとも１つ以上の組織に所属しているか
	const firstOrganization = organizations[0]
	if (firstOrganization) {
		// アクセス履歴より遷移
		const cookie = await getCookieSession(request)
		const lastOrganizationId = cookie.get("lastOrganizationId")
		if (organizations.some((o) => o.id === lastOrganizationId)) {
			return redirect(`/organizations/${lastOrganizationId}`)
		}

		// 一つしかなかったらそれに遷移
		if (organizations.length === 1) {
			cookie.set("lastOrganizationId", firstOrganization.id)
			return redirect(`/organizations/${firstOrganization.id}`, {
				headers: {
					"Set-Cookie": await commitSession(cookie),
				},
			})
		}
	}
	// 複数あったら選択させる、または無い場合
	return { organizations }
}

export default function HomePage({
	loaderData: { organizations },
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
			<div className="px-4 py-6 space-y-2">
				<h1>所属する組織</h1>
				<div className="space-y-1">
					{organizations.length > 0 ? (
						organizations.map((o) => (
							<>
								<ButtonPrimitive
									render={<Link to={`/organizations/${o.id}`} />}
									nativeButton={false}
									className="flex items-center w-full px-4 py-3 rounded-2xl transition-[background,color,opacity] hover:opacity-80 bg-surface-container active:opacity-60"
								>
									<div className="grow text-start">{o.name}</div>
									<div className="shrink-0">
										<ChevronRightIcon className="size-4" />
									</div>
								</ButtonPrimitive>
								<ButtonPrimitive className="flex items-center w-full px-4 py-3 rounded-2xl transition-[background,color,opacity] hover:opacity-80 bg-surface-container active:opacity-60">
									<div className="grow text-start">{o.name}</div>
									<div className="shrink-0">
										<ChevronRightIcon className="size-4" />
									</div>
								</ButtonPrimitive>
							</>
						))
					) : (
						<div>所属していません</div>
					)}
				</div>
			</div>
		</div>
	)
}
