import { createCookieSessionStorage, type Session } from "react-router"

type SessionData = {
	lastOrganizationId?: string
}

type SessionFlashData = {
	error: {
		status: number
		message: string
		cause?: string
	}
}

export type CookieSession = Session<SessionData, SessionFlashData>

export const {
	getSession: _getSession,
	commitSession,
	destroySession,
} = createCookieSessionStorage<SessionData, SessionFlashData>({
	cookie: {
		name: "__session",
		httpOnly: true,
		maxAge: 60,
		path: "/",
		sameSite: "lax",
		secrets: ["secret"], // TODO: 環境変数を使う
		secure: true,
	},
})

export async function getCookieSession(request: Request) {
	return await _getSession(request.headers.get("Cookie"))
}
