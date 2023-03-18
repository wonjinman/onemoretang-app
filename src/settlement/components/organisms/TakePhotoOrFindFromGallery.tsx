import { WINDOW_WIDTH } from '../../../common/constants/constants'
import { Alert, Image, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as ImagePicker from 'react-native-image-picker'
import React, { useState } from 'react'
import { Asset } from 'react-native-image-picker'
import { navigation } from '../../../common/navigation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '../../../common/constants/colors'
import { Font } from '../../../common/components/atoms/Font'

export const TakePhotoOrFindFromGallery: React.FC<{
	setPictures: (assets: Asset[]) => void
	pictures: Asset[]
}> = ({ pictures, setPictures }) => {
	const [isFromGallery, setIsFromGallery] = useState<boolean>(false)
	const navigateToCameraScreen = () => {
		setIsFromGallery(false)
		navigation.navigate('GetPhotoScreen', {
			onGetBack: (picture: Asset) => {
				setPictures([picture])
			},
		})
	}
	return (
		<View style={{ borderWidth: 1, borderStyle: 'dashed' }}>
			{pictures.length > 0 ? (
				<>
					<Image
						//TODO 이미지가 세로로 긴 이미지일 경우, 돌려서 보여줘야함.
						source={{ uri: pictures[0].uri }}
						//TODO 대충 방망이 깎는 식으로 height 크기를 맞췄는데, 이 부분 나중에 수정 필요함!
						// style={{ width: '100%', height: '100%' }}
						style={{ width: '100%', height: WINDOW_WIDTH * 0.6 * 0.8 }}
						resizeMethod={'auto'}
						resizeMode={'contain'}
						// resizeMode={isFromGallery ? 'contain' : 'cover'}
					/>
					<TouchableOpacity
						hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
						style={{ position: 'absolute', top: 4, right: 4 }}
						onPress={() => {
							setPictures([])
						}}>
						<MaterialCommunityIcons name={'close'} size={24} color={Colors.DEER_GRAY_600} />
					</TouchableOpacity>
				</>
			) : (
				<View
					style={{
						borderColor: Colors.DEER_BLACK,
						justifyContent: 'center',
						height: WINDOW_WIDTH * 0.6 * 0.8,
						paddingVertical: 20,
						alignItems: 'center',
						backgroundColor: Colors.DEER_GRAY_100,
					}}>
					<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
						<TouchableOpacity
							style={{
								flex: 1,
								justifyContent: 'center',
								alignItems: 'center',
								/*borderRightWidth: 1,
                  borderStyle: 'dashed',*/
							}}
							onPress={navigateToCameraScreen}>
							<Icon color={Colors.DEER_BLACK} name={'camera'} size={50} />
							<Font style={{ fontWeight: 'bold', fontSize: 18 }} color={Colors.DEER_BLACK}>
								새로 촬영하기
							</Font>
						</TouchableOpacity>
						<View
							style={{
								borderWidth: 0.5,
								borderColor: Colors.DEER_BLACK,
								borderStyle: 'dashed',
							}}
						/>
						<TouchableOpacity
							style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
							onPress={async () => {
								try {
									const imagePickerResponse = await ImagePicker.launchImageLibrary({
										selectionLimit: 1,
										mediaType: 'photo',
										includeBase64: false,
										// 이렇게 하면 크기가 거의 1/6로 줄어듦. 나중에 사진 해상도 관련 문제가 생기면 수정 필요
										quality: 0.5,
									})
									if (imagePickerResponse && imagePickerResponse.assets) {
										setIsFromGallery(true)
										setPictures(imagePickerResponse.assets)
									}
								} catch (err) {
									Alert.alert('에러', `${err}`)
								}
							}}>
							<Icon color={Colors.DEER_BLACK} name={'folder-multiple-image'} size={50} />
							<Font style={{ fontWeight: 'bold', fontSize: 18 }} color={Colors.DEER_BLACK}>
								사진첩에서 찾기
							</Font>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</View>
	)
}
