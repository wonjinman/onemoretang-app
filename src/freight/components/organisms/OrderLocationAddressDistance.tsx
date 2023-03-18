import React from 'react'
import { View } from 'react-native'
import { Location } from '../../domain/types/Location'
import { LocationType } from '../../domain/enums/LocationType'

export const OrderLocationAddressDistance: React.FC<{
	location: Location
	locationType: LocationType
	isCompact?: boolean
	distance?: number | null
}> = props => {
	const { location } = props

	return (
		<View
			style={{
				paddingTop: 12,
				flexDirection: 'row',
				alignItems: 'center',
			}}
		>
		</View>
	)
}
