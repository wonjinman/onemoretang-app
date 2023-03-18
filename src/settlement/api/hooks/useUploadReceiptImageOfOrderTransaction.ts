import { QueryClient, useMutation } from 'react-query'
import { Alert } from 'react-native'
import { apiConnectorSettlement } from '../../../common/connectors/api-spring'
import { QueryKeys } from '../../../common/domain/enums/QueryKeys'
import { apiConnectorServerless } from '../../../common/connectors/api-serverless'

export const useUploadReceiptImageOfOrderTransaction = (
	queryClient: QueryClient,
	orderTransactionId: number,
) => {
	return useMutation(
		async (data: { body: any; imageUris: string[]; imageNames: string[] }) => {
			// serverless-api는 도메인 주소가 https://serverless-api.betacarri.to
			const response = await apiConnectorServerless.postForm<{ imageUrls: string[] }>(
				`/settlements/receipts/upload-images`,
				data.body,
				data.imageUris,
				data.imageNames,
			)

			const uploadedImageUrls = response?.imageUrls
			return apiConnectorSettlement.post(
				`/settlements/order-transactions/${orderTransactionId}/receipts/images`,
				{ imageUrls: uploadedImageUrls },
			)
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries([QueryKeys.RECEIPT_IMAGES, orderTransactionId])
				queryClient.invalidateQueries([QueryKeys.ORDER_TRANSACTIONS])
			},
		},
	)
}
