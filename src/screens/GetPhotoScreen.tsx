import React, { useRef, useState, useEffect } from 'react'
// import { CameraCapturedPicture } from 'expo-camera/src/Camera.types'
// import { Camera } from 'expo-camera'
import {
	Alert,
	ImageCropData,
	TouchableOpacity,
	View,
	StyleSheet,
	Text,
	Image,
	Platform,
} from 'react-native'
import { Colors } from '../common/constants/colors'
import { ORDER_IMAGE_SIZE, WINDOW_WIDTH } from '../common/constants/constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import ImageEditor from '@react-native-community/image-editor'
import { MainStack } from '../../App'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
import { BigButton } from '../common/components/molecule/BigButton'
import { Space } from '../common/components/molecule/Spacing'
import { Font } from '../common/components/atoms/Font'

const TakePhotoButton: React.FC<{
	onPress: () => void
}> = props => (
	<TouchableOpacity
		style={{
			width: 60,
			height: 60,
			borderRadius: 60,
			backgroundColor: '#fff',
			justifyContent: 'center',
			alignItems: 'center',
		}}
		onPress={props.onPress}>
		<Icon name={'camera'} size={40} color={Colors.SUB_YELLOW} />
	</TouchableOpacity>
)

type ScreenProps = NativeStackScreenProps<MainStack, 'GetPhotoScreen'>

const GetPhotoScreen: React.FC<ScreenProps> = ({ navigation, route }) => {
	const cameraRef = useRef<Camera>(null)
	const devices = useCameraDevices()
	const device = devices.back
	const [isCameraActive, setIsCameraActive] = useState(true)

	const [picture, setPicture] = useState<{ uri: string } | undefined>()
	const [hasPermission, setHasPermission] = useState<boolean>(false)
	const [savedPicture, setSavedPicture] = useState<{ uri: string } | undefined>()

	const takePicture = async () => {
		try {
			// const pictureCaptured = await cameraRef?.current?.takePictureAsync({
			// 	skipProcessing: true,
			// })
			const pictureCaptured = await cameraRef.current?.takePhoto()
			console.log(
				pictureCaptured,
				pictureCaptured.width,
				pictureCaptured.height,
				pictureCaptured.path,
			)
			if (!pictureCaptured) {
				Alert.alert('알림', '사진을 다시 촬영해주세요')
				// cameraRef?.current?.
				return
			}

			let croppedPicture

			if (Platform.OS === 'android') {
				const width = (ORDER_IMAGE_SIZE.HEIGHT / WINDOW_WIDTH) * (await pictureCaptured).height

				const height = (await pictureCaptured).height

				const cropData: ImageCropData = {
					offset: { x: (await pictureCaptured).width / 3, y: 0 },
					size: { width: width, height: height },
					displaySize: { width: width, height: height },
				}
				croppedPicture = await ImageEditor.cropImage(
					'file://' + (await pictureCaptured).path,
					cropData,
				)
			} else {
				const height = (ORDER_IMAGE_SIZE.HEIGHT / WINDOW_WIDTH) * (await pictureCaptured).height

				const width = (await pictureCaptured).height

				const cropData: ImageCropData = {
					offset: { x: 0, y: (await pictureCaptured).width / 3 },
					size: { width: width, height: height },
					displaySize: { width: width, height: height },
				}
				croppedPicture = await ImageEditor.cropImage(
					'file://' + (await pictureCaptured).path,
					cropData,
				)
			}
			//
			console.log(croppedPicture)

			// setPicture({ uri: (await pictureCaptured).path })
			setPicture({ uri: croppedPicture })
			setSavedPicture({ uri: (await pictureCaptured).path })
		} catch (err) {
			console.log('ERROR', err)
			Alert.alert(`${err}`)
		}
	}

	const requestCameraPermission = async () => {
		const status = await Camera.requestCameraPermission()
		setHasPermission(status === 'authorized')
		return
	}

	useEffect(() => {
		requestCameraPermission()
	}, [])

	if (device == null)
		return (
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: 'white',
				}}>
				<Text>Loading</Text>
			</View>
		)

	return (
		//TODO 촬영했을 때 화면 멈추게
		<View style={{ flex: 1 }}>
			{savedPicture ? (
				<Image
					source={{ uri: savedPicture.uri }}
					style={StyleSheet.absoluteFill}
					resizeMode={'contain'}
				/>
			) : (
				<Camera
					// ratio={'16:9'}
					ref={cameraRef}
					style={StyleSheet.absoluteFill}
					device={device}
					photo
					isActive={isCameraActive}
					// type={}
					// flashMode={Camera.Constants.FlashMode.auto}
				/>
			)}
			<View
				style={{
					flex: 1,
					opacity: 0.9,
					backgroundColor: Colors.BACKGROUND_BLACK,
					paddingHorizontal: 20,
					justifyContent: 'flex-end',
				}}>
				<View style={{ flexDirection: 'row', paddingBottom: 20 }}>
					<View style={{ flex: 1, alignItems: 'center' }}>
						<Icon
							name={'fit-to-screen-outline'}
							color={Colors.TEXT_WHITE}
							size={50}
							style={{ marginBottom: 8 }}
						/>
						<Font style={{ fontSize: 16 }} color={Colors.TEXT_WHITE}>
							아래 화면에 맞춰{`\n`}가로로 촬영하세요
						</Font>
					</View>
					<View style={{ flex: 1, alignItems: 'center' }}>
						<Icon
							name={'fit-to-screen'}
							color={Colors.TEXT_WHITE}
							size={50}
							style={{ backgroundColor: '#000', marginBottom: 8 }}
						/>
						<Font style={{ fontSize: 16 }} color={Colors.TEXT_WHITE}>
							검정 배경 위에서{`\n`}촬영해주세요
						</Font>
					</View>
				</View>
			</View>
			<View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' }}>
				<View
					style={{
						width: ORDER_IMAGE_SIZE.WIDTH,
						height: ORDER_IMAGE_SIZE.HEIGHT,
						borderWidth: 3,
						borderColor: Colors.SUB_YELLOW,
					}}
				/>
			</View>
			<View
				style={{
					flex: 1,
					opacity: 0.9,
					backgroundColor: Colors.BACKGROUND_BLACK,
					justifyContent: 'flex-end',
					alignItems: 'center',
				}}>
				{picture ? (
					<View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
						<BigButton
							text={'다시찍기'}
							onPress={() => {
								setPicture(undefined)
								setSavedPicture(undefined)
								// cameraRef?.current?.resumePreview()
							}}
							backgroundColor={Colors.DEER_GRAY_600}
							wrapperStyle={{ flex: 1, height: 60 }}
						/>
						<BigButton
							wrapperStyle={{ flex: 1, marginLeft: 12, height: 60 }}
							backgroundColor={Colors.MAIN_YELLOW}
							text={'촬영완료'}
							onPress={() => {
								route.params.onGetBack(picture)
								navigation.goBack()
							}}
						/>
					</View>
				) : (
					<TakePhotoButton onPress={takePicture} />
				)}
				<Space space={40} />
			</View>
		</View>
	)
}
export default GetPhotoScreen
