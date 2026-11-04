import {
	createContext,
	type MiddlewareFunction,
	type RouterContextProvider,
	redirect,
} from "react-router"
import { authContext } from "../context"

async function getSession(
	context: Readonly<RouterContextProvider>,
	request: Request,
) {
	const auth = context.get(authContext)
	const session = await auth.api.getSession({ headers: request.headers })
	return session
}

export const sessionContext =
	createContext<Awaited<ReturnType<typeof getSession>>>()

export const authMiddleware: MiddlewareFunction<Response> = async (
	{ request, context },
	next,
) => {
	const session = await getSession(context, request)
	if (!session) return redirect("/auth", 401)
	context.set(sessionContext, session)
	return await next()
}
