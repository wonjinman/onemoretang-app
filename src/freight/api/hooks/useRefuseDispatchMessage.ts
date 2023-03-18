import { QueryClient, useMutation } from 'react-query'
import { apiConnector } from '../../../common/connectors/api'
import { Alert } from 'react-native'

export const useRefuseDispatchMessage = (queryClient: QueryClient) => {
	return useMutation<any, any, { driverSearchId: number }>(
		async ({ driverSearchId }) => {
			try {
				const response = await apiConnector.post(`/driver-searches/${driverSearchId}/refuse`)
				return response.data
			} catch (err) {
				Alert.alert(`서비스에 문제가 생겼어요!\n 내용: ${err}`)
				throw err
			}
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('freights')
				queryClient.invalidateQueries('driver-searches')
			},
		},
	)
}
