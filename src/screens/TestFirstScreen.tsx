import React, { useMemo, useRef } from 'react'
import { Text, View } from 'react-native'
import WebView from 'react-native-webview'
import { useNavigation } from '@react-navigation/native'
import { StackActions } from '@react-navigation/native'
import { ENV } from '../common/ENV'

const TestFirstScreen = () => {
	const navigation = useNavigation()
	const webViewRef = useRef<WebView>(null)

	// 앱에서 웹 메시지 받기
	const onMessage = (e: any) => {
		const event = JSON.parse(e.nativeEvent.data)
		console.log('onMessage', event)
		//웹으로 메시지 보내기
		// webViewRef.current?.postMessage(event.method)
		if (event.method === 'CAMERA_UPLOAD_RECEIPT') {
			navigation.navigate('ReceiptCameraScreen')
		}
		if (event.method === 'NAVIGATE_PUSH') {
			const pushAction = StackActions.push(event.navigation.screen, event.navigation.params)
			navigation.dispatch(pushAction)
		}
	}
	console.log(ENV.WEB_URL)
	console.log(ENV)
	return (
		<WebView
			style={{ flex: 1 }}
			source={{
				// uri: 'http://10.0.2.2:3000',
				// uri: 'http://localhost:3000',
				// uri: 'http://192.168.0.121:3000',
				uri: ENV.WEB_URL,
			}}
			ref={webViewRef}
			onMessage={onMessage}
		/>
		// <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		// 	<Text>HI</Text>
		// </View>
	)
}

export default TestFirstScreen
