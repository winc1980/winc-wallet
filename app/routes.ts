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
] satisfies RouteConfig
