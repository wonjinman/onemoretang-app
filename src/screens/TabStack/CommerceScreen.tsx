import React, { useEffect, useMemo, useRef } from 'react'
import WebViewTemplate from '../../common/components/template/WebViewTemplate'
import { View, Text } from 'react-native'
import { getStatusBarHeight } from 'react-native-safearea-height'
import { ENV } from '../../common/ENV'

const CommerceScreen = () => {
	return (
		<View style={{ flex: 1, marginTop: getStatusBarHeight(true) }}>
			<WebViewTemplate
				source={{
					uri: `${ENV.WEB_URL}/commerce`,
				}}
			/>
		</View>
	)
}

export default CommerceScreen
