import DeviceInfo from 'react-native-device-info'

export const tryGetPhoneNumber = (): string => {
	// Android: null return: no permission, empty string: unprogrammed or empty SIM1, e.g. "+15555215558": normal return value
	return DeviceInfo.getPhoneNumberSync() ?? ''
}
