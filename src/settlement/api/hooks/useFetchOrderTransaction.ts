import { UseQueryOption } from '../../../common/api/hooks'
import { useQuery } from 'react-query'
import { QueryKeys } from '../../../common/domain/enums/QueryKeys'
import { apiConnectorSettlement } from '../../../common/connectors/api-spring'
import { DateRange } from '../../../common/domain/types/DateRange'
import { OrderTransaction } from '../../domain/types/OrderTransaction'

export const useFetchOrderTransaction = (orderId: number, options: UseQueryOption = {}) => {
	return useQuery<OrderTransaction, unknown, OrderTransaction>(
		[QueryKeys.ORDER_TRANSACTION, orderId],
		async () => {
			const response = await apiConnectorSettlement.get<OrderTransaction>(
				`/settlements/drivers/me/order-transactions/${orderId}`,
			)
			return response ?? undefined
		},
		options,
	)
}
