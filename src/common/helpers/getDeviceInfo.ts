import DeviceInfo from 'react-native-device-info'

export const getDeviceInfo = () => {
	const deviceId = DeviceInfo.getDeviceId()
	const brand = DeviceInfo.getBrand()
	const model = DeviceInfo.getModel()
	const version = DeviceInfo.getVersion()
	const systemVersion = DeviceInfo.getSystemVersion()
	const buildNumber = DeviceInfo.getBuildNumber()

	const carrier = DeviceInfo.getCarrierSync()
	const apiLevel = DeviceInfo.getApiLevelSync()
	const maxMemory = DeviceInfo.getMaxMemorySync()
	const fontScale = DeviceInfo.getFontScaleSync()

	return {
		deviceId,
		brand,
		model,
		carrier,
		systemVersion,
		apiLevel,
		version,
		buildNumber,
		maxMemory,
		fontScale,
	}
}
