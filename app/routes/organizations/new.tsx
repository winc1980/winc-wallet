import { Button, Field, Form } from "@base-ui/react"
import { Form as RouterForm } from "react-router"
import { ScaffoldLayout } from "~app/components/layout/common-layout"
import { useIsFormLoading } from "~app/hooks/use-is-form-loading"
import { cn } from "~app/utils/cn"

export default function OrganizationCreatePage() {
	const isLoading = useIsFormLoading()
	return (
		<ScaffoldLayout name="新しい組織を作成" back>
			<div className="flex flex-col gap-6">
				<Form render={<RouterForm method="POST" />} className="space-y-6">
					<fieldset className="fieldset">
						<Field.Root name="organization-name" className="field-root">
							<Field.Label>組織名</Field.Label>
							<Field.Control type="text" required className="input-text" />
							<Field.Error className="field-error" />
						</Field.Root>
					</fieldset>
					<div className="flex flex-col md:items-end-safe mt-8">
						<Button
							type="submit"
							disabled={isLoading}
							className={cn(
								"box box-interactive flex items-center justify-center px-4 py-2",
							)}
						>
							組織を作成
						</Button>
					</div>
				</Form>
			</div>
		</ScaffoldLayout>
	)
}
