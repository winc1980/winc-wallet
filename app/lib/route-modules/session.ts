import type { RouterContextProvider } from "react-router"
import { authContext } from "../context"

export async function getSession(
	context: Readonly<RouterContextProvider>,
	request: Request,
) {
	const auth = context.get(authContext)
	const session = auth.api.getSession({ headers: request.headers })
	return session
}
