import { Alert } from 'react-native'
import { useMutation } from 'react-query'
import { validateOrReject } from 'class-validator'
import { plainToInstance } from 'class-transformer'
import { LoginDto } from '../../../common/api/dtos'
import { apiConnector } from '../../../common/connectors/api'
import { useAuthStore } from '../../stores'
import { storage } from 'common/storage/storage'
import { TOKEN_KEY } from 'common/storage/storage-key'
import { isObject } from 'lodash'

interface LoginReponse {
	accessToken: string
}

export const useLogin = () => {
	return useMutation<string | undefined, unknown, LoginDto>(async (dto: LoginDto) => {
		// network로 가져온 뒤, store와 storage 모두에 저장한다. 이 내용들을 모두 하나의 함수 안에 넣는 것이 좋은 생각일까?
		await validateOrReject(plainToInstance(LoginDto, dto))
		const response = await apiConnector.post<LoginReponse>(`accounts/driver/login`, dto)
		if (isObject(response)) {
			const { accessToken } = response.data!
			useAuthStore.getState().setToken(accessToken)
			await storage.set(TOKEN_KEY, accessToken)
			return accessToken
		} else {
			Alert.alert('등록되어있지 않은 번호입니다.\n담당 배차자에게 문의하세요!')
			return
		}
	})
}
