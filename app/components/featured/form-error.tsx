export function FormError({ formError }: { formError?: string | undefined }) {
	if (!formError) return null
	return <div className="field-error">{formError}</div>
}
