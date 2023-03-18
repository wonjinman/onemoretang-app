import React, { useState } from 'react'
import { View, Text, Platform, ToastAndroid, Alert } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStack } from '../../App'
import { Colors } from '../common/constants/colors'
import { Font } from '../common/components/atoms/Font'
import { useQueryClient } from 'react-query'
import { useUploadReceiptImageOfOrderTransaction } from '../settlement/api/hooks/useUploadReceiptImageOfOrderTransaction'
import { useFetchReceiptImagesOfOrderTransaction } from '../settlement/api/hooks/useFetchReceiptImagesOfOrderTransaction'
import { BottomButton } from '../settlement/components/molecules/BottomButton'
import { TakePhotoOrFindFromGallery } from '../settlement/components/organisms/TakePhotoOrFindFromGallery'
import { Asset } from 'react-native-image-picker'
import { UploadedReceiptImagesView } from '../settlement/components/organisms/UploadedReceiptImagesView'
import { navigation } from '../common/navigation'
import { alertWithDoubleCheck } from '../common/utils'
import { useFetchOrderTransaction } from '../settlement/api/hooks/useFetchOrderTransaction'

type WebviewType = NativeStackScreenProps<MainStack, 'UploadReceiptScreen'>

const UploadReceiptScreen = ({ route }: WebviewType) => {
	const [pictures, setPictures] = useState<Asset[]>([])

	const orderId = Number(route.params.orderId)

	const queryClient = useQueryClient()
	const uploadReceiptImageOfOrderTransactionHook = useUploadReceiptImageOfOrderTransaction(
		queryClient,
		orderId,
	)

	const { data: fetchedReceiptImages } = useFetchReceiptImagesOfOrderTransaction(orderId)
	const { data: orderTransaction } = useFetchOrderTransaction(orderId)

	const receiptImages = fetchedReceiptImages ?? []

	const uploadReceiptImageOfOrderTransaction = () => {
		uploadReceiptImageOfOrderTransactionHook
			.mutateAsync({
				body: { orderTransactionId: orderId },
				imageUris: pictures.map(picture => picture.uri!),
				imageNames: pictures.map((picture, idx) => `${orderId}-[${idx}]`),
			})
			.then(() => {
				Alert.alert('인수증 업로드에 성공했습니다.')
				navigation.navigate('HomeScreen')
			})
	}
	const uploadReceipt = () => {
		alertWithDoubleCheck(
			'인수증을 보내시겠어요?',
			'확인 버튼을 누르면 인수증을 전송합니다.',
			uploadReceiptImageOfOrderTransaction,
		)
	}

	return (
		<View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
			<View
				style={{
					marginHorizontal: 20,
					flex: 1,
					marginTop: 20,
					marginBottom: Platform.OS === 'ios' ? 20 : 0,
				}}>
				<TakePhotoOrFindFromGallery setPictures={setPictures} pictures={pictures} />
				{receiptImages.length > 0 && <UploadedReceiptImagesView receiptImages={receiptImages} />}
				<BottomButton onPress={uploadReceipt} text={'인수증 사진 업로드'} />
			</View>
		</View>
	)
}

export default UploadReceiptScreen
