import { Button } from "@base-ui/react"
import { ChevronLeftIcon } from "lucide-react"
import { useNavigate } from "react-router"

export function BackButton() {
	const navigate = useNavigate()
	return (
		<Button
			className="box box-interactive size-12 flex items-center justify-center"
			onClick={() => navigate(-1)}
		>
			<ChevronLeftIcon className="icon-inline" />
		</Button>
	)
}
