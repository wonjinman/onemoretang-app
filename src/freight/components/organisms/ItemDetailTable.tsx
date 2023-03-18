import { StyleSheet, View } from 'react-native'
import { Colors } from '../../../common/constants/colors'
import { LunaText } from '../../../common/components/atoms/LunaText'
import React from 'react'
import { Freight } from '../../domain/types'
import { KorVehicleMap, Vehicle } from '../../../common/domain/enums/Vehicle'

export const ItemDetailTable: React.FC<{
	freight: Freight
	showVerboseVersion?: boolean
}> = ({ freight, showVerboseVersion }) => {
	return (
		<View style={{}}>
			<View style={{ flexDirection: 'row', backgroundColor: Colors.SUB_GRAY }}>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<View style={[styles.labelWrapper]}>
						<LunaText color={Colors.TEXT_WHITE}>화물정보</LunaText>
					</View>
					<View style={[styles.contentWrapper]}>
						<LunaText color={Colors.SUB_GOLD} fontSize={20}>
							{freight.itemName}
						</LunaText>
					</View>
				</View>
			</View>
			<View style={{ flexDirection: 'row', backgroundColor: Colors.SUB_GRAY }}>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<View style={styles.labelWrapper}>
						<LunaText color={Colors.TEXT_WHITE}>
							{showVerboseVersion ? '톤수' : '상세정보'}
						</LunaText>
					</View>
					<View style={styles.contentWrapper}>
						{showVerboseVersion ? (
							<LunaText color={Colors.SUB_GOLD} fontSize={20}>
								{freight.truck?.payloadCapacity}톤
							</LunaText>
						) : (
							<LunaText color={Colors.SUB_GOLD} fontSize={20}>
								{freight.itemWeight || '-'}톤 / {freight.truck?.payloadCapacity}톤 /{' '}
								{KorVehicleMap.get(freight.truck?.bodyType ?? Vehicle.CARGO)} / 편도
							</LunaText>
						)}
					</View>
				</View>
				{showVerboseVersion && (
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<View style={styles.labelWrapper}>
							<LunaText color={Colors.TEXT_WHITE}>적재중량</LunaText>
						</View>
						<View style={styles.contentWrapper}>
							<LunaText color={Colors.SUB_GOLD} fontSize={20}>
								{freight.itemWeight || '-'} 톤
							</LunaText>
						</View>
					</View>
				)}
			</View>
			{showVerboseVersion && (
				<View style={{ flexDirection: 'row', backgroundColor: Colors.SUB_GRAY }}>
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<View style={styles.labelWrapper}>
							<LunaText color={Colors.TEXT_WHITE}>차종</LunaText>
						</View>
						<View style={styles.contentWrapper}>
							<LunaText color={Colors.SUB_GOLD} fontSize={20}>
								{KorVehicleMap.get(freight.truck?.bodyType ?? Vehicle.CARGO)}
							</LunaText>
						</View>
					</View>
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<View style={styles.labelWrapper}>
							<LunaText color={Colors.TEXT_WHITE}>운행방법</LunaText>
						</View>
						<View style={styles.contentWrapper}>
							<LunaText color={Colors.SUB_GOLD} fontSize={20}>
								편도
							</LunaText>
						</View>
					</View>
				</View>
			)}
			{freight.itemNotice && (
				<View style={{ flexDirection: 'row', backgroundColor: Colors.SUB_GRAY }}>
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<View style={[styles.labelWrapper]}>
							<LunaText color={Colors.TEXT_WHITE}>유의사항</LunaText>
						</View>
						<View style={[styles.contentWrapper]}>
							<LunaText color={Colors.SUB_GOLD} fontSize={20}>
								{freight.itemNotice}
							</LunaText>
						</View>
					</View>
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	labelWrapper: {
		backgroundColor: Colors.BACKGROUND_DARK_BLACK,
		width: 80,
		justifyContent: 'center',
		alignItems: 'center',
	},
	contentWrapper: {
		flex: 1,
		paddingVertical: 10,
		backgroundColor: Colors.BACKGROUND_BLACK,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
