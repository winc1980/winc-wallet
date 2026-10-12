import type { ReactNode } from "react"

export function CommonLayout({ children }: { children: ReactNode }) {
	return (
		<div className="w-full lg:w-5xl md:w-3xl mx-auto py-6 px-4">{children}</div>
	)
}

export function SmallFormLayout({ children }: { children: ReactNode }) {
	return (
		<div className="w-full h-dvh flex flex-col items-center justify-center">
			<div className="w-full md:w-3xl md:border mx-auto p-6">{children}</div>
		</div>
	)
}
