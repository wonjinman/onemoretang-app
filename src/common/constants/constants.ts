import { Dimensions } from 'react-native'
import { ENV } from '../ENV'

export const WINDOW_WIDTH = Dimensions.get('window').width
export const WINDOW_HEIGHT = Dimensions.get('window').height

export const ORDER_IMAGE_SIZE = {
	WIDTH: WINDOW_WIDTH * 0.9,
	HEIGHT: (WINDOW_WIDTH / 375) * 220,
}

export const initialDriverID = 0 // 0: 아무도 없음, 69:손명균, 170:원동준
export const initialDriverAccountId = 4 // 4: 김지원

export const ONESIGNAL_APP_ID = ENV.ONESIGNAL_APP_ID
