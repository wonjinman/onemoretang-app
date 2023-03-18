import { useQuery, UseQueryOptions } from 'react-query'
import { QueryKey } from 'react-query/types/core/types'
import { apiConnector } from '../../connectors/api'

export type UseQueryOption<T = any> = Omit<
	UseQueryOptions<T, unknown, T, any>,
	'queryKey' | 'queryFn'
>
export const useFetchData = <T = any>(
	queryKey: QueryKey,
	path: string,
	options: UseQueryOption<T> = {},
) => {
	return useQuery<T, unknown, T>(
		queryKey,
		async () => {
			const response = await apiConnector.get<T>(path)
			return response.data!
		},
		options,
	)
}
