import { Image, Modal, ScrollView, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../../common/constants/colors'
import { WINDOW_WIDTH } from '../../../common/constants/constants'
import React, { useState } from 'react'
import { ReceiptImage } from '../../domain/types'
import { useFetchReceiptImagesOfOrderTransaction } from '../../api/hooks/useFetchReceiptImagesOfOrderTransaction'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Font } from '../../../common/components/atoms/Font'
import { getStatusBarHeight } from 'react-native-safearea-height'

export const UploadedReceiptImagesView: React.FC<{
	receiptImages: ReceiptImage[]
}> = ({ receiptImages }) => {
	const [selectedReceiptImage, setSelectedReceiptImage] = useState<ReceiptImage>()
	return (
		<>
			<Modal
				onRequestClose={() => {
					setSelectedReceiptImage(undefined)
				}}
				animationType={'fade'}
				transparent={true}
				visible={selectedReceiptImage !== undefined}>
				<View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
					<TouchableOpacity
						style={{ alignItems: 'flex-end', padding: 24, marginTop: getStatusBarHeight(true) }}
						onPress={() => {
							setSelectedReceiptImage(undefined)
						}}>
						<Icon name={'close'} style={{ fontSize: 30, color: 'white' }} />
					</TouchableOpacity>
					<View style={{ flex: 1, justifyContent: 'center', marginBottom: 24 }}>
						<Image
							style={{ width: WINDOW_WIDTH, height: '100%' }}
							source={{ uri: selectedReceiptImage?.path }}
							resizeMode={'contain'}
						/>
					</View>
				</View>
			</Modal>
			<View>
				<View style={{ alignItems: 'flex-start', marginTop: 12 }}>
					<Font color={Colors.TEXT_BLACK} style={{ fontSize: 16 }}>
						전송한 인수증 목록 ({receiptImages?.length}개)
					</Font>
				</View>
				<ScrollView
					horizontal={true}
					style={{ flexDirection: 'row', marginTop: 8 }}
					contentContainerStyle={{ alignItems: 'center' }}
					showsHorizontalScrollIndicator={true}>
					{receiptImages.map(receiptImage => (
						<TouchableOpacity
							key={`receipt-image-preview-id-${receiptImage.id}`}
							onPress={() => {
								setSelectedReceiptImage(receiptImage)
							}}
							style={{ borderWidth: 1 }}>
							<Image
								style={{
									width: WINDOW_WIDTH * 0.8 * 0.5,
									height: WINDOW_WIDTH * 0.66 * 0.8 * 0.5,
									marginRight: 8,
								}}
								source={{ uri: receiptImage.path }}
								//resizeMode={'contain'}
							/>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>
		</>
	)
}
