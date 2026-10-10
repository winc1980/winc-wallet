import { createContext } from "react-router"

export const apiFetchContext = createContext<typeof fetch>()
export const cookieContext = createContext<string>()
