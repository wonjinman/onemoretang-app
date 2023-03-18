import React, { useRef, useState } from 'react'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '../common/constants/colors'

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
const ReceiptCameraScreen = () => {
	const devices = useCameraDevices()
	const device = devices.back
	const camera = useRef<Camera>(null)

	const [isCameraActive, setIsCameraActive] = useState(true)

	const takePhoto = () => {
		camera.current?.takePhoto().then(data => {
			console.log(data)
		})
	}

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
		<View style={{ flex: 1 }}>
			<Camera
				ref={camera}
				style={StyleSheet.absoluteFill}
				device={device}
				photo
				isActive={isCameraActive}
			/>
			<View style={{ position: 'absolute', alignSelf: 'center', bottom: 52 }}>
				<TakePhotoButton onPress={takePhoto} />
			</View>
		</View>
	)
}

export default ReceiptCameraScreen
