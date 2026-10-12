import {
	type ChangeEvent,
	type DetailedHTMLProps,
	type InputHTMLAttributes,
	useCallback,
} from "react"

const ALLOWED = ["image/png", "image/jpeg", "image/webp"]

export function ImageInput(
	props: Omit<
		DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
		"type" | "accept" | "onChange"
	>,
) {
	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
			const files = e.target.files
			if (!files) return
			for (const file of files) {
				if (!ALLOWED.includes(file.type)) {
					alert("PNG / JPEG / WebP のみアップロードできます")
					e.target.value = "" // 選択をリセット
					return
				}
			}
		},
		[],
	)
	return (
		<input
			type="file"
			accept={ALLOWED.join(",")}
			onChange={handleChange}
			{...props}
		/>
	)
}
