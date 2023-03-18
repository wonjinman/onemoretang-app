import React from 'react'
import { View } from 'react-native'
import { MyText } from 'common/components/atoms/MyText'

export const OrderStatusBadge: React.FC<{
	status: string
	color?: string
	backgroundColor: string
}> = props => {
	return (
		<View
			style={{
				backgroundColor: props.backgroundColor,
				paddingHorizontal: 8,
				paddingVertical: 4,
				borderRadius: 4,
			}}
		>
			<MyText style={{ color: props.color || '#fff', fontSize: 14, fontWeight: 'bold' }}>
				{props.status}
			</MyText>
		</View>
	)
}
