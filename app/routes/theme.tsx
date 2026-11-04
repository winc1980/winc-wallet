import { Button } from "~app/components/ui/button"

export default function ThemePage() {
	return (
		<div className="flex flex-col gap-2 p-2">
			<div className="flex gap-2">
				<div className="flex flex-col gap-1">
					<div>
						<div className="p-8 bg-primary text-on-primary">Primary</div>
						<div className="px-8 py-4 bg-on-primary text-primary">
							On Primary
						</div>
					</div>
					<div>
						<div className="px-8 py-4 bg-primary-container text-on-primary-container">
							Primary Container
						</div>
						<div className="px-8 py-4 bg-on-primary-container text-primary-container">
							On Primary Container
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<div>
						<div className="p-8 bg-secondary text-on-secondary">Secondary</div>
						<div className="px-8 py-4 bg-on-secondary text-secondary">
							On Secondary
						</div>
					</div>
					<div>
						<div className="px-8 py-4 bg-secondary-container text-on-secondary-container">
							Secondary Container
						</div>
						<div className="px-8 py-4 bg-on-secondary-container text-secondary-container">
							On Secondary Container
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<div>
						<div className="p-8 bg-destructive text-on-destructive">
							Destructive
						</div>
						<div className="px-8 py-4 bg-on-destructive text-destructive">
							On Destructive
						</div>
					</div>
					<div>
						<div className="px-8 py-4 bg-destructive-container text-on-destructive-container">
							Destructive Container
						</div>
						<div className="px-8 py-4 bg-on-destructive-container text-destructive-container">
							On Destructive Container
						</div>
					</div>
				</div>
			</div>
			<div className="flex">
				<div className="p-8 bg-surface-container-high text-on-surface">
					Surface High
				</div>
				<div className="p-8 bg-surface-container text-on-surface">
					Surface Container
				</div>
				<div className="p-8 bg-surface-container-low text-on-surface">
					Surface Low
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<div className="flex gap-1">
					<Button variant="primary">Primary</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="destructive">Destructive</Button>
				</div>
				<div className="flex gap-1">
					<Button variant="primaryContainer">Primary</Button>
					<Button variant="secondaryContainer">Secondary</Button>
					<Button variant="destructiveContainer">Destructive</Button>
				</div>
				<div className="flex gap-1 items-center">
					<Button size="xl">Extra Large</Button>
					<Button size="lg">Large</Button>
					<Button size="default">Default</Button>
					<Button size="sm">Small</Button>
					<Button size="xs">Extra Small</Button>
				</div>
			</div>
		</div>
	)
}
