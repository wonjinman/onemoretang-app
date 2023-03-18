import React, { ReactNode } from 'react'
import { View } from 'react-native'
import { toArray } from '../../utils'

export const Space: React.FC<{
	space: number
	direction?: 'row'
}> = props => {
	const { space, children, direction } = props
	const childNodes = toArray(children)

	return (
		<View style={{ flexDirection: direction }}>
			{childNodes.length > 0 ? (
				childNodes.map((child, idx) => {
					return (
						<View key={idx}>
							{child}
							<View style={{ height: space }} />
						</View>
					)
				})
			) : (
				<View style={{ height: space }} />
			)}
		</View>
	)
}
