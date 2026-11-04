import type { ReactNode } from "react"
import { cn } from "~app/utils/cn"
import { BackButton } from "../featured/back-button"

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

export function ScaffoldLayout({
	back,
	name,
	children,
}: {
	back?: boolean
	name: string
	children: ReactNode
}) {
	return (
		<div className="h-dvh flex flex-col">
			<div className="h-16 flex items-center w-full lg:w-5xl md:w-3xl mx-auto px-4">
				{back && <BackButton />}
				<div className="font-bold md:hidden">{name}</div>
			</div>
			<CommonLayout>
				<h1 className="mb-6 font-bold hidden md:block">{name}</h1>
				{children}
			</CommonLayout>
		</div>
	)
}
