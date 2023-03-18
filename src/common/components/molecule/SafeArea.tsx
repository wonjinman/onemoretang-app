import React from 'react'
import { SafeAreaView, ViewStyle } from 'react-native'

export const SafeArea: React.FC<{ style?: ViewStyle }> = props => {
	return <SafeAreaView style={[{ flex: 1 }, props.style]}>{props.children}</SafeAreaView>
}
