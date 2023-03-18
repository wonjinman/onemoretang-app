import { useFetchData, UseQueryOption } from '../../../common/api/hooks'
import { SearchDriverResponseBody } from '../socket'

export const useFetchDriverSearches = (options: UseQueryOption = {}) =>
	useFetchData<SearchDriverResponseBody[]>('driver-searches', `/driver-searches`, options)
