import { createContext } from "react-router"
import type { createAuth } from "./auth"

export const apiFetchContext = createContext<typeof fetch>()
export const cookieContext = createContext<string>()
export const authContext = createContext<ReturnType<typeof createAuth>>()
