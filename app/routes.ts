import {
	index,
	prefix,
	type RouteConfig,
	route,
} from "@react-router/dev/routes"

export default [
	index("routes/home.tsx"),
	...prefix("receipt", [
		index("routes/receipt/index.tsx"),
		route("upload", "routes/receipt/upload.tsx"),
	]),
] satisfies RouteConfig
