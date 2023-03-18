import { Linking, TouchableOpacity, View } from 'react-native'
import { Colors } from 'common/constants/colors'
import { LunaText } from 'common/components/atoms/LunaText'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import React from 'react'
import { OrderFreightEntity } from '../../domain/types'

export const CallToBrokerButton: React.FC<{ orderFreight: OrderFreightEntity }> = ({
	orderFreight,
}) => (
	<View
		style={{
			position: 'absolute',
			right: 30,
			bottom: 30,
			alignItems: 'center',
		}}
	>
		<TouchableOpacity
			onPress={() => {
				//TODO default값이 원진이형 전화번호로 되어있음
				Linking.openURL(`tel:${orderFreight?.brokerAccount?.phone ?? '01035477694'}`)
			}}
			style={{
				marginTop: 8,
				width: 70,
				height: 70,
				borderRadius: 70,
				backgroundColor: Colors.SUB_ORANGE,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<LunaText color={Colors.TEXT_WHITE} fontSize={16}>
				배차
			</LunaText>
			<Icon color={Colors.TEXT_WHITE} name={'phone'} size={35} />
		</TouchableOpacity>
	</View>
)
