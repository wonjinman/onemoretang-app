import { QueryClient, useMutation } from 'react-query'
import { validateOrReject } from 'class-validator'
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { apiConnector } from '../../connectors/api'
import { Alert } from 'react-native'

const useCreateData = <T, DTO extends object>(
	queryClient: QueryClient,
	path: string,
	DTOClass: unknown,
) => {
	return useMutation<T, unknown, DTO>(
		async (dto: DTO) => {
			await validateOrReject(
				plainToInstance<DTO, typeof DTOClass>(DTOClass as ClassConstructor<DTO>, dto),
			)
			const response = await apiConnector.post<T>(path, dto)
			return response.data!
		},
		{
			onSuccess: async () => {
				const pathTokens = path.split('/').slice(1)
				return queryClient.invalidateQueries(pathTokens.length === 1 ? pathTokens[0] : pathTokens)
			},
		},
	)
}
