import { UseQueryOption } from '../../../common/api/hooks'
import { useQuery } from 'react-query'
import { QueryKeys } from '../../../common/domain/enums/QueryKeys'
import { apiConnectorSettlement } from '../../../common/connectors/api-spring'
import { Receipt, ReceiptImage } from '../../domain/types'

export const useFetchReceiptImagesOfOrderTransaction = (
	orderTransactionId: number,
	options: UseQueryOption = {},
) => {
	return useQuery<ReceiptImage[], unknown, ReceiptImage[]>(
		[QueryKeys.RECEIPT_IMAGES, orderTransactionId],
		async () => {
			const response = await apiConnectorSettlement.get<Receipt>(
				`/settlements/order-transactions/${orderTransactionId}/receipts/images`,
			)
			return response!.receiptImages
		},
		options,
	)
}
