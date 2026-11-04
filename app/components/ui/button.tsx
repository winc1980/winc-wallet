import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "~app/utils/cn"

const buttonVariants = cva(
	"inline-flex rounded-full justify-center items-center gap-1 transition-opacity hover:opacity-80 active:opacity-60",
	{
		variants: {
			variant: {
				primary: "bg-primary text-on-primary",
				secondary: "bg-secondary text-on-secondary",
				destructive: "bg-destructive text-on-destructive",
				primaryContainer: "bg-primary-container text-on-primary-container",
				secondaryContainer:
					"bg-secondary-container text-on-secondary-container",
				destructiveContainer:
					"bg-destructive-container text-on-destructive-container",
			},
			size: {
				xs: "px-3 py-1",
				sm: "px-5 py-2",
				default: "px-6 py-3",
				lg: "px-8 py-4",
				xl: "px-10 py-6",
			},
		},
	},
)

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>

export function Button({
	className,
	variant = "primary",
	size = "default",
	...props
}: ButtonProps) {
	return (
		<ButtonPrimitive
			className={cn(buttonVariants({ className, variant, size }))}
			{...props}
		/>
	)
}
