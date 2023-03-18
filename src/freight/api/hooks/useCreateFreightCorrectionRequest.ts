import { QueryClient, useMutation } from 'react-query'
import { FreightCorrectionRequest } from '../../domain/types'
import { validateOrReject } from 'class-validator'
import { plainToInstance } from 'class-transformer'
import { apiConnector } from '../../../common/connectors/api'
import { Alert } from 'react-native'
import { CreateFreightCorrectionRequestDto } from '../dtos'

export const useCreateFreightCorrectionRequest = (queryClient: QueryClient, freightId: number) => {
	return useMutation<FreightCorrectionRequest, unknown, CreateFreightCorrectionRequestDto>(
		async (data: CreateFreightCorrectionRequestDto) => {
			try {
				await validateOrReject(plainToInstance(CreateFreightCorrectionRequestDto, data))
				const response = await apiConnector.post<FreightCorrectionRequest>(
					`/freights/${freightId}/correction-requests`,
					data,
				)
				return response.data as FreightCorrectionRequest
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
