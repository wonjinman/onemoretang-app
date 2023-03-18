import React from 'react'
import { Text as RNText, TextProps } from 'react-native'
import { Colors } from '../../constants/colors'

interface Props extends TextProps {
	color?: string
	isTitle?: boolean
	isBold?: boolean
}

export const Font: React.FC<Props> = ({ color, isTitle, isBold, style, children, ...others }) => {
	// const colorScheme = useColorScheme()
	// const bold = isBold || style?.fontWeight === 700 || style?.fontWeight === 'Bold'
	return (
		<RNText
			allowFontScaling={false}
			style={[
				{
					fontSize: isTitle ? 16 : 14,
					//TODO font 통일
					color: color ?? Colors.DEER_BLACK,
					// fontFamily: 'roboto',
				},
				style,
			]}
			{...others}>
			{children}
		</RNText>
	)
}
