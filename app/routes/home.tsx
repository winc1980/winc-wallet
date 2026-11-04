import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { ChevronRightIcon, PanelLeftIcon } from "lucide-react"
import { Link, redirect } from "react-router"
import { getApiClient } from "~app/lib/route-modules/api"
import type { Route } from "./+types/home"

export async function loader({ context }: Route.LoaderArgs) {
	const api = getApiClient(context)
	const res = await api.organizations.me.$get()
	if (res.status === 401) return redirect("/auth")
	const { organizations } = await res.json()
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
