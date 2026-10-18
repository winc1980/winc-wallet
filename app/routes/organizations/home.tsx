import type { Route } from "./+types/home"

export async function loader() {}

export default function OrganizationHomePage({ params }: Route.ComponentProps) {
	return <div>Home Page: {params.organizationId}</div>
}
