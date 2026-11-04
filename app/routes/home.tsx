import { PlusIcon } from "lucide-react"
import { Link } from "react-router"
import { Button } from "~app/components/ui/button"
import { Input } from "~app/components/ui/input"
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
			<div className="p-4">
				<Button
					// className="box box-interactive flex items-center gap-2 px-3 py-2 w-max"
					nativeButton={false}
					render={<Link to={"/organizations/new"} />}
				>
					<PlusIcon className="icon-inline shrink-0" />
					<div className="grow">組織を作成</div>
				</Button>
				<Input />
			</div>
			<pre>{JSON.stringify(session, null, 2)}</pre>
		</div>
	)
}
