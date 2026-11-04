import { Hono } from "hono"
import type { ApiEnv } from "~server/types"

export const userApi = new Hono<ApiEnv>().basePath("/users")
