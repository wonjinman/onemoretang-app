import { Freight } from '../../domain/types'
import { UseQueryOption } from '../../../common/api/hooks'
import { useQuery } from 'react-query'
import { apiConnector } from '../../../common/connectors/api'

export const useFetchFreights = (filters?: Partial<Freight>, options: UseQueryOption = {}) => {
	return useQuery<Freight[], unknown, Freight[]>(
		'freights',
		async () => {
			const response = await apiConnector.get<Freight[]>('/drivers/me/freights', filters)
			return response.data!
		},
		options,
	)
}
