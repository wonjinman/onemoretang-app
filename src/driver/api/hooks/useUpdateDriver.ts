import { QueryClient, useMutation } from 'react-query'
import { BrokerDriver } from '../../domain/types/BrokerDriver'
import { validateOrReject } from 'class-validator'
import { plainToInstance } from 'class-transformer'
import { apiConnector } from '../../../common/connectors/api'
import { Alert } from 'react-native'
import { UpdateDriverDto } from '../dtos/UpdateDriverDto'
import { useUserStore } from '../../stores'

export const useUpdateDriver = (queryClient: QueryClient, driverId?: number) => {
	return useMutation<BrokerDriver, unknown, UpdateDriverDto>(
		async (driverDto: UpdateDriverDto) => {
			try {
				if (!driverId) {
					throw new Error('잠시 후에 다시 시도해주세요. 문제가 지속될 경우 문의부탁드립니다.')
				}
				await validateOrReject(plainToInstance(UpdateDriverDto, driverDto))
				const response = await apiConnector.put<BrokerDriver>(`/drivers/me`, driverDto)
				return response.data!
			} catch (err) {
				console.log(err)
				throw err
			}
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['drivers', 'me'])
				useUserStore.getState().updateProfileFromToken()
			},
		},
	)
}
