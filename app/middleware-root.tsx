import { Outlet } from "react-router"
import type { Route } from "./+types/middleware-root"
import { apiClientMiddleware } from "./lib/middlewares/api-client-middleware"

export const middleware: Route.MiddlewareFunction[] = [apiClientMiddleware]

export default function MiddlewareRoot() {
	return <Outlet />
}
