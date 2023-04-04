import DeviceInfo from 'react-native-device-info'

export const getDeviceKey = () => DeviceInfo.getUniqueIdSync()
