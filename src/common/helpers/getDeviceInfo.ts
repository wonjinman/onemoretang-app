import DeviceInfo from 'react-native-device-info'

export const getDeviceInfo = async () => {
	const [carrier, apiLevel, maxMemory, fontScale] = await Promise.all([
		DeviceInfo.getCarrier(),
		DeviceInfo.getApiLevel(),
		DeviceInfo.getMaxMemory(),
		DeviceInfo.getFontScale(),
	])

	const deviceId = DeviceInfo.getDeviceId()
	const brand = DeviceInfo.getBrand()
	const model = DeviceInfo.getModel()
	const version = DeviceInfo.getVersion()
	const systemVersion = DeviceInfo.getSystemVersion()
	const buildNumber = DeviceInfo.getBuildNumber()

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
