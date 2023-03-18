import { QueryClient, useMutation } from 'react-query'
import { apiConnector } from '../../../common/connectors/api'
import { Alert } from 'react-native'
import { AxiosError } from 'axios'

export const useAcceptDispatchMessage = (queryClient: QueryClient) => {
	return useMutation<any, any, { driverSearchId: number }>(
		async ({ driverSearchId }) => {
			try {
				const response = await apiConnector.post(`/driver-searches/${driverSearchId}/accept`)
				return response.data
			} catch (err) {
				if ((err as AxiosError).response?.status === 400) {
					Alert.alert('이미 배차 완료된 일감입니다!')
					return
				}
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
