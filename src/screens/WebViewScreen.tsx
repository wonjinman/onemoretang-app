import React, { useMemo, useRef } from 'react'
import WebViewTemplate from '../common/components/template/WebViewTemplate'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStack } from '../../App'
import { View } from 'react-native'

type WebviewType = NativeStackScreenProps<MainStack, 'WebViewScreen'>

const WebViewScreen = ({ route }: WebviewType) => {
	const styles = route.params.style ?? {}
	return (
		<View style={[{ flex: 1 }, styles]}>
			<WebViewTemplate source={{ uri: route.params.url }} />
		</View>
	)
}

export default WebViewScreen
