import React, { ReactNode } from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'
import { Colors } from '../../constants/colors'
import { Font } from '../atoms/Font'

interface ButtonProps {
	text: string
	onPress: () => void
	fontSize?: number
	backgroundColor?: string
	textColor?: string
	wrapperStyle?: ViewStyle
	textComponent?: ReactNode
	disabled?: boolean
	hitSlop?: number
}

export const BigButton = (props: ButtonProps) => {
	const {
		text,
		onPress,
		fontSize,
		textColor,
		backgroundColor,
		wrapperStyle,
		textComponent,
		disabled,
		hitSlop,
	} = props

	return (
		<TouchableOpacity
			hitSlop={{ top: hitSlop, bottom: hitSlop, left: hitSlop, right: hitSlop }}
			disabled={disabled}
			onPress={onPress}
			style={[
				{
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: disabled ? Colors.DEACTIVATE_GRAY : backgroundColor || Colors.MAIN_MINT,
					height: 60,
				},
				wrapperStyle,
			]}>
			{textComponent || (
				<Font style={{ fontWeight: 'bold', fontSize: fontSize || 24, color: textColor || '#fff' }}>
					{text}
				</Font>
			)}
		</TouchableOpacity>
	)
}
