import { QueryClient, useMutation } from 'react-query'
import { apiConnector } from '../../../common/connectors/api'
import { Alert } from 'react-native'

export const useUploadFreightReceipt = (queryClient: QueryClient, freightId: number) => {
	return useMutation(
		async (data: { body: any; imageUris: string[]; imageNames: string[] }) => {
			try {
				const response = await apiConnector.postForm(
					`/freights/${freightId}/receipt`,
					data.body,
					data.imageUris,
					data.imageNames,
				)
				return response.data
			} catch (err) {
				Alert.alert(`서비스에 문제가 생겼어요!\n 내용: ${err}`)
				throw err
			}
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['freights'])
				queryClient.invalidateQueries(['freights', freightId])
			},
		},
	)
}
