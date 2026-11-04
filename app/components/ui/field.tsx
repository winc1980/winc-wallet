import { Field } from "@base-ui/react/field"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "~app/utils/cn"

const fieldErrorVariants = cva("text-destructive text-sm")

type FieldErrorProps = Field.Error.Props &
	VariantProps<typeof fieldErrorVariants>

export function FieldError({ className, ...props }: FieldErrorProps) {
	return (
		<Field.Error className={cn(fieldErrorVariants({ className }))} {...props} />
	)
}
