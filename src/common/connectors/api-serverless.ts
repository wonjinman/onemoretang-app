import axios, {AxiosInstance, AxiosRequestConfig} from 'axios'
import * as Sentry from '@sentry/react-native'
import {useAuthStore} from '../../driver/stores'
import {ENV} from '../ENV'

export interface APIMessage<T> {
	status: number
	data?: T
	msg?: string
}

export interface PaginationMetadata {
	itemCount: number
	totalItems?: number
	itemsPerPage: number
	totalPages?: number
	currentPage: number
}

export interface PaginatedResponse<T> {
	status: number
	data: T[]
	meta: PaginationMetadata
}

const APIErrorMessage = {
	status: 500,
	msg: '인터넷 연결이 좋지 않아요.\n네트워크 상태를 확인해주세요!',
}

export class APIConnector {
	private _apiInstance: AxiosInstance = axios.create({
		baseURL: ENV.SERVERLESS_BASE_URL,
		timeout: 3000,
		headers: this.commonHeaders,
	})

	constructor() {
		this._apiInstance.interceptors.request.use(config => {
			// TODO initToken을 호출해 accessToken을 항상 업데이트 하긴 하지만, getState()로만 불러와도 문제가 안 되는지 확인이 필요.
			const token = useAuthStore.getState().accessToken
			config.headers!.Authorization = token ? `Bearer ${token}` : ''
			console.log('===== INTERCEPTS REQUEST USE =====')
			console.log(config.headers)
			return config
		})
		this._apiInstance.interceptors.response.use(
			response => {
				return response
			},
			error => {
				Sentry.captureException(error)
				console.log('==== SERVERLESS ERROR CONSOLE =====')
				if (error.response?.status === 401) {
					return useAuthStore.getState().removeToken()
				}
				throw error
			},
		)
	}

	get commonHeaders() {
		return {
			Accept: 'application/json',
			'x-req-ts': new Date().getTime().toString(),
		}
	}

	async get<T>(path: string, params?: any): Promise<T> {
		return this.request(path, 'GET', { params })
	}

	async post<T>(path: string, body?: object): Promise<T> {
		console.log('CONSOLE IN AXIOS POST')
		return this.request(path, 'POST', { data: body })
	}

	async put<T>(path: string, body?: object): Promise<T> {
		return this.request(path, 'PUT', { data: body })
	}

	async delete<T>(path: string): Promise<T> {
		return this.request(path, 'DELETE')
	}

	private async request<T>(
		path: string,
		method: 'GET' | 'POST' | 'PUT' | 'DELETE',
		options: AxiosRequestConfig = {},
	): Promise<T> {
		const response = await this._apiInstance.request<T>({
			method,
			url: path,
			...options,
		})
		return response.data
	}

	async postForm<T = any>(
		path: string,
		body: any,
		imageUris: string[],
		imageNames: string[],
	): Promise<T> {
		const form = new FormData()
		imageUris.forEach((item, i) => {
			form.append('file', {
				// @ts-ignore
				uri: item,
				type: 'image/jpeg',
				name: `${imageNames[i]}.jpg`,
			})
		})

		const response = await this._apiInstance.post<T>(path, form, {
			headers: {
				...this.commonHeaders,
				'Content-Type': 'multipart/form-data',
			},
		})
		return response.data
	}
}

export const apiConnectorServerless = new APIConnector()
