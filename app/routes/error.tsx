import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { ChevronLeftIcon } from "lucide-react"
import { data, useNavigate } from "react-router"
import { getCookieSession } from "~app/lib/session"
import type { Route } from "./+types/error"

export async function loader({ request }: Route.LoaderArgs) {
	const cookie = await getCookieSession(request)
	const error = cookie.get("error")
	return data(
		{ error },
		// { headers: { "Set-Cookie": await commitSession(cookie) } },
	)
}

export default function ErrorPage({
	loaderData: { error },
}: Route.ComponentProps) {
	const navigate = useNavigate()
	return (
		<div className="relative h-dvh">
			<div className="sticky top-0 left-0 right-0 h-16 flex items-center justify-start">
				<ButtonPrimitive onClick={() => navigate(-1)} className="size-16 p-2">
					<ChevronLeftIcon className="size-12 p-3 rounded-full transition-colors active:bg-secondary-container" />
				</ButtonPrimitive>
			</div>
			{error && (
				<div className="px-4 pt-16 space-y-2">
					<h1 className="font-bold text-4xl">{error.status}</h1>
					<h2>{error.message}</h2>
					<pre className="text-on-surface-variant">{error.cause}</pre>
				</div>
			)}
		</div>
	)
}
