import React, { useEffect, useMemo, useRef, useState } from 'react'
import WebView, { WebViewMessageEvent, WebViewProps } from 'react-native-webview'
import analytics from '@react-native-firebase/analytics'
import DeviceInfo from 'react-native-device-info'
import { StackActions } from '@react-navigation/native'
import { getStatusBarHeight } from 'react-native-safearea-height'
import { ENV } from '../../ENV'
import { useAuthStore } from '../../../driver/stores'
import { navigation } from '../../navigation'
import { storage } from 'common/storage/storage'
import { getDeviceInfo, getDeviceKey, tryGetPhoneNumber } from 'common/helpers'
import UserAgent from 'react-native-user-agent'

/**
 * 우리 웹에만 사용할 것
 * 로그인이 완료되었다고 가정했을때임.
 */
const WebViewTemplate = (props: WebViewProps) => {
	const webViewRef = useRef<WebView>(null)
	const [isLoad, setIsLoad] = useState<boolean>(false)
	const authStore = useAuthStore()
	const SOURCE = props.source || {
		uri: ENV.WEB_URL,
	}


	const [webviewKey, setWebviewKey] = useState<number>(0)
	const reload = () => {
		setWebviewKey(webviewKey + 1)
	}

	const postMessage = (data: any) => {
		webViewRef?.current?.postMessage(JSON.stringify(data))
	}

	// 앱에서 웹 메시지 받기
	const onMessage = (e: WebViewMessageEvent) => {
		const event = JSON.parse(e.nativeEvent.data)

		/**
		 * 새 네비게이션 탭
		 * 푸시 기능 수정 필요
		 */
		switch (event.method) {
			case 'NAVIGATE_PUSH':
				return navigation.push(event.navigation.name, event.navigation.params)

			case 'CONSOLE_LOG':
				return console.log(
					'BY WEB \n',
					`URL: ${JSON.stringify(SOURCE)}\n`,
					'\n******************************************************\n',
					...event.data,
					'\n******************************************************\n',
				)

			case 'LOGOUT':
				return useAuthStore.getState().removeToken()

			case 'REQUEST_TOKEN':
				return initialize()

			case 'NAVIGATE_HOME':
				return navigation.setRoot('HomeScreen')

			case 'NAVIGATE_GOBACK':
				return navigation.goBack()

			case 'NAVIGATE_NAVIGATE':
				return navigation.navigate(event.navigation.name, event.navigation.params)

			case 'ANALYTICS_LOG':
				return analytics().logEvent(event.log.name, event.log.params)

			case 'STORAGE_SET':
				return storage.set(event.key, event.value)

			case 'STORAGE_GET':
				return storage.get(event.key).then(data =>
					postMessage({
						method: 'STORAGE_GET_RESULT',
						data,
					}),
				)

			case 'STORAGE_REMOVE':
				return storage.remove(event.key)

			case 'GET_DEVICE_INFO':
				return getDeviceInfo().then(data =>
					postMessage({
						method: 'GET_DEVICE_INFO_RESULT',
						data,
					}),
				)

			case 'GET_DEVICE_KEY':
				return postMessage({
					method: 'GET_DEVICE_KEY_RESULT',
					data: getDeviceKey(),
				})

			case 'GET_PHONE_NUMBER':
				return postMessage({
					method: 'GET_PHONE_NUMBER_RESULT',
					data: tryGetPhoneNumber(),
				})

			case 'LOGIN':
				return useAuthStore.getState().setToken(event.token)

			case 'REMOVE_TOKEN':
				return useAuthStore.getState().removeToken()
		}
	}

	const initialize = () => {
		postMessage({
			method: 'INITIALIZE',
			data: {
				token: authStore.accessToken,
				apiServerBaseURL: ENV.API_SERVER_BASE_URL,
				mainNodeApiServerBaseURL: ENV.API_SERVER_NODE_BASE_URL,
				mainSpringApiServerBaseURL: ENV.API_SERVER_SPRING_BASE_URL,
				profile: ENV.PROFILE,
			},
		})
	}

	return (
		<WebView
			style={{ flex: 1 }}
			source={SOURCE}
			accessible
			ref={webViewRef}
			onMessage={onMessage}
			onLoadEnd={() => setIsLoad(true)}
			key={webviewKey}
			onContentProcessDidTerminate={reload}
			userAgent={`${UserAgent.getUserAgent()} WEBAPP`}
		/>
	)
}

export default WebViewTemplate
