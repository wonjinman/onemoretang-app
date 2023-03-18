import { QueryClient, useMutation } from 'react-query'
import { apiConnector } from '../../../common/connectors/api'
import { BrokerDriver } from '../../../driver/domain/types/BrokerDriver'
import { Alert } from 'react-native'

export const useIssueTaxInvoice = (queryClient: QueryClient, freightId: number) => {
	return useMutation(
		async () => {
			try {
				if (!freightId) {
					throw new Error('잠시 후에 다시 시도해주세요. 문제가 지속될 경우 문의부탁드립니다.')
				}
				const response = await apiConnector.post<BrokerDriver>(`/freights/${freightId}/tax-invoice`)
				return response?.data
			} catch (err) {
				Alert.alert(`서비스에 문제가 생겼어요!\n 내용: ${err}`)
				throw err
			}
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('freights')
				queryClient.invalidateQueries(['freights', freightId])
			},
		},
	)
}
