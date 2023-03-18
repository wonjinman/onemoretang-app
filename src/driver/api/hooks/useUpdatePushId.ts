import { QueryClient, useMutation } from 'react-query'
import { validateOrReject } from 'class-validator'
import { plainToInstance } from 'class-transformer'
import { apiConnector } from '../../../common/connectors/api'
import { Alert } from 'react-native'
import { UpdatePushIdDto } from '../dtos/UpdatePushIdDto'

export const useUpdatePushId = (queryClient: QueryClient) => {
	return useMutation<unknown, unknown, UpdatePushIdDto>(
		async (pushIdDto: UpdatePushIdDto) => {
			try {
				await validateOrReject(plainToInstance(UpdatePushIdDto, pushIdDto))
				const response = await apiConnector.put(`/accounts/driver/push`, pushIdDto)
				return response
			} catch (err) {
				console.log(err)
				throw err
			}
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['drivers', 'me'])
			},
		},
	)
}
