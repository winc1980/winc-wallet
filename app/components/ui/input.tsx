import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "~app/utils/cn"

const inputVariants = cva("px-3 py-2 rounded-xl bg-surface-container outline-0")

type InputProps = InputPrimitive.Props & VariantProps<typeof inputVariants>

export function Input({ className, ...props }: InputProps) {
	return (
		<InputPrimitive className={cn(inputVariants({ className }))} {...props} />
	)
}
