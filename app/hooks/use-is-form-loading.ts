import { type useFetcher, useNavigation } from "react-router"

export function useIsFormLoading(fetcher?: ReturnType<typeof useFetcher>) {
	const navigation = useNavigation()
	if (fetcher) {
		return fetcher.state !== "idle" && fetcher.formData != null
	}
	return navigation.state !== "idle" && navigation.formData != null
}
