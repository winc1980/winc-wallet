import {
	index,
	prefix,
	route,
	type RouteConfig,
} from "@react-router/dev/routes"

export default [
	index("routes/home.tsx"),
	...prefix("receipts", [
		index("routes/receipts/index.tsx"),
		route("upload", "routes/receipts/upload.tsx"),
	]),
] satisfies RouteConfig
