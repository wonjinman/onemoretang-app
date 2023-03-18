import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Colors } from '../../../common/constants/colors'
import { Font } from '../../../common/components/atoms/Font'

export const BottomButton: React.FC<{
	onPress: () => void
	text: string
	disabled?: boolean
	bottom?: number
	float?: boolean
}> = ({ onPress, text, disabled, bottom, float = true }) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={disabled}
			style={{
				position: float ? 'absolute' : undefined,
				bottom: float ? bottom ?? 12 : 0,
				left: float ? 0 : undefined,
				right: float ? 0 : undefined,
				width: float ? undefined : '100%',
				backgroundColor: !disabled ? Colors.MAIN_YELLOW : Colors.DEER_GRAY_100,
				height: 53,
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<Font
				style={{
					fontSize: 16,
					fontWeight: 'bold',
					color: !disabled ? Colors.DEER_BLACK : Colors.DEER_GRAY_300,
				}}>
				{text}
			</Font>
		</TouchableOpacity>
	)
}
