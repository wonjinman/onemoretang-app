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
				return storage.get(event.key)

			case 'STORAGE_REMOVE':
				return storage.remove(event.key)

			case 'GET_DEVICE_INFO':
				return getDeviceInfo()

			case 'GET_DEVICE_KEY':
				return getDeviceKey()

			case 'GET_PHONE_NUMBER':
				return tryGetPhoneNumber()

			case 'LOGIN':
				return useAuthStore.getState().setToken(event.token)
		}
	}

	const initialize = () => {
		webViewRef?.current?.postMessage(
			JSON.stringify({
				method: 'INITIALIZE',
				token: authStore.accessToken,
				serverBaseURL: ENV.API_SERVER_SETTLEMENT_BASE_URL,
			}),
		)
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
		/>
	)
}

export default WebViewTemplate
