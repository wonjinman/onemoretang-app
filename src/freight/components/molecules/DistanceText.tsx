import { Colors } from '../../../common/constants/colors'
import { LocationType } from '../../domain/enums/LocationType'
import { MyText } from '../../../common/components/atoms/MyText'
import React from 'react'

export const DistanceText: React.FC<{ locationType: LocationType; distance: number | null }> = ({
	locationType,
	distance,
}) => {
	return (
		<MyText style={{ fontWeight: 'bold', fontSize: 16, color: Colors.TEXT_WHITE }}>
			{locationType === LocationType.LOADING ? '현재 위치에서' : '상차지에서'} {distance || ' - '}
			km
		</MyText>
	)
}
