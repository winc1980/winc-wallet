import {
	index,
	prefix,
	type RouteConfig,
	route,
} from "@react-router/dev/routes"

export default [
	index("routes/home.tsx"),
	...prefix("receipts", [
		index("routes/receipts/index.tsx"),
		route("list", "routes/receipts/list.tsx"),
		route("upload", "routes/receipts/upload.tsx"),
	]),
	...prefix("auth", [
		index("routes/auth/index.tsx"),
		route("register", "routes/auth/register.tsx"),
		route("login", "routes/auth/login.tsx"),
	]),

	...prefix("organizations", [
		index("routes/organizations/list.tsx"),
		...prefix(":organizationId", [index("routes/organizations/home.tsx")]),
	]),
] satisfies RouteConfig
