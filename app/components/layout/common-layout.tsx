import type { ReactNode } from "react"

export function CommonLayout({ children }: { children: ReactNode }) {
	return (
		<div className="w-full lg:w-5xl md:w-3xl mx-auto py-6 px-4">{children}</div>
	)
}
