import type { ReactNode } from "react"
import { cn } from "~app/utils/cn"

export function CommonLayout({ children }: { children: ReactNode }) {
	return (
		<div className="w-full lg:w-5xl md:w-3xl mx-auto py-6 px-4">{children}</div>
	)
}

export function SmallBoxLayout({
	children,
	className,
}: {
	children: ReactNode
	className?: string
}) {
	return (
		<div className="w-full h-dvh flex flex-col items-center justify-center">
			<div className={cn("w-full md:w-3xl md:box mx-auto p-6", className)}>
				{children}
			</div>
		</div>
	)
}
