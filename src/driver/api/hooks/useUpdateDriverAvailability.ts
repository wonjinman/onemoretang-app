import { QueryClient, useMutation } from 'react-query'
import { validateOrReject } from 'class-validator'
import { plainToInstance } from 'class-transformer'
import { apiConnector } from '../../../common/connectors/api'
import { Alert } from 'react-native'
import { UpdateDriverAvailabilityDto } from '../dtos/UpdateDriverAvailabilityDto'
import { fetchMyProfile } from './fetchMyProfile'
import { useUserStore } from '../../stores'

export const useUpdateDriverAvailability = (queryClient: QueryClient, driverId?: number) => {
	return useMutation<unknown, unknown, UpdateDriverAvailabilityDto>(
		async (driverDto: UpdateDriverAvailabilityDto) => {
			try {
				if (!driverId) {
					throw new Error('잠시 후에 다시 시도해주세요. 문제가 지속될 경우 문의부탁드립니다.')
				}
				await validateOrReject(plainToInstance(UpdateDriverAvailabilityDto, driverDto))
				const response = await apiConnector.put(`/drivers/me/availability`, driverDto)
				return response.data!
			} catch (err) {
				Alert.alert(`서비스에 문제가 생겼어요!\n 내용: ${err}`)

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
