import React, { useEffect, useMemo, useRef, useState } from 'react'
import WebView, { WebViewProps } from 'react-native-webview'
import { StackActions } from '@react-navigation/native'
import { getStatusBarHeight } from 'react-native-safearea-height'
import { ENV } from '../../ENV'
import { useAuthStore } from '../../../driver/stores'
import { navigation } from '../../navigation'
import analytics from "@react-native-firebase/analytics";

type WebViewTemplate = {} & WebViewProps
/**
 * 우리 웹에만 사용할 것
 * 로그인이 완료되었다고 가정했을때임.
 */
const WebViewTemplate = (props: WebViewTemplate) => {
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
	const onMessage = (e: any) => {
		const event = JSON.parse(e.nativeEvent.data)

		/**
		 * 새 네비게이션 탭
		 * 푸시 기능 수정 필요
		 */
		if (event.method === 'NAVIGATE_PUSH') {
			navigation.push(event.navigation.name, event.navigation.params)
			return
		}
		// Console
		if (event.method === 'CONSOLE_LOG') {
			console.log(
				'BY WEB \n',
				`URL: ${JSON.stringify(SOURCE)}\n`,
				'\n******************************************************\n',
				...event.data,
				'\n******************************************************\n',
			)
			return
		}
		if (event.method === 'LOGOUT') {
			useAuthStore.getState().removeToken()
			return
		}
		if (event.method === 'REQUEST_TOKEN') {
			initialize()
			return
		}
		if (event.method === 'NAVIGATE_HOME') {
			navigation.setRoot('HomeScreen')
			return
		}
		if (event.method === 'NAVIGATE_GOBACK') {
			navigation.goBack()
			return
		}
		if (event.method === 'NAVIGATE_NAVIGATE') {
			navigation.navigate(event.navigation.name, event.navigation.params)
			return
		}
		if(event.method === "ANALYTICS_LOG") {
			analytics().logEvent(event.log.name, event.log.params)
			return
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
