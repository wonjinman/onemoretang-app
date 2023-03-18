import React, { useEffect, useRef } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import ReceiptCameraScreen from './src/screens/ReceiptCameraScreen'
import { Colors } from './src/common/constants/colors'
import LoginScreen from './src/screens/LoginScreen'
import { useAuthStore } from './src/driver/stores'
import { _navigationRef, setIsNavigationReady } from './src/common/navigation'
import { QueryClient, QueryClientProvider } from 'react-query'
import HomeScreen from './src/screens/HomeScreen'
import WebViewScreen from './src/screens/WebViewScreen'
import {Alert, Linking, Platform, StyleSheet} from 'react-native'
import UploadReceiptScreen from './src/screens/UploadReceiptScreen'
import GetPhotoScreen from './src/screens/GetPhotoScreen'
import remoteConfig from '@react-native-firebase/remote-config'
import DeviceInfo from 'react-native-device-info'

export type MainStack = {
	LoginScreen: undefined
	HomeScreen: undefined
	ReceiptCameraScreen: undefined
	WebViewScreen: {
		url: string
		title?: string
		style?: StyleSheet
	}
	UploadReceiptScreen: {
		orderId: string
	}
	GetPhotoScreen: { onGetBack: (picture: any) => void }
}
type WebviewType = NativeStackScreenProps<MainStack, 'WebViewScreen'>

const Stack = createNativeStackNavigator<MainStack>()

function App(): JSX.Element {
	const queryClientRef = useRef<QueryClient>()
	if (!queryClientRef.current) {
		queryClientRef.current = new QueryClient()
	}

	const getTokenFromStorage = useAuthStore(state => state.getTokenFromStorage)

	// NOTE(MG_S): 이곳은 변수 initiate을 위한 장소
	// App 컴포넌트는 리렌더될 경우 react-navigation 이 꼬이기 때문에
	// UI 상태 변경이 필요하다면 HomeStack 아래에서 적용하기

	const checkVersion = async () => {
		await remoteConfig()
			.setConfigSettings({ minimumFetchIntervalMillis: 10})
			.then(() => remoteConfig().fetchAndActivate())
			.then(fetchedRemotely => {
				if (fetchedRemotely) {
					console.log('Configs were retrieved from the backend and activated.')
				} else {
					console.log(
						'No configs were fetched from the backend, and the local configs were already activated',
					)
				}
			})



		const minimumVersion = remoteConfig().getValue('minimumVersion').asString()
		const currentVersion = DeviceInfo.getVersion()

		console.log(minimumVersion)
		console.log(currentVersion)

		const minVersionArray = minimumVersion.split('.')
		const currentVersionArray = currentVersion.split('.')

		const isAllowVersion = (allowedVersion: string[], appVersion: string[]): boolean => {
			// if (isNaN(Number(appVersion[2]))) return true

			if (Number(allowedVersion[0]) < Number(appVersion[0])) return true
			if (Number(allowedVersion[0]) > Number(appVersion[0])) return false
			if (Number(allowedVersion[1]) < Number(appVersion[1])) return true
			if (Number(allowedVersion[1]) > Number(appVersion[1])) return false
			if (Number(allowedVersion[2]) <= Number(appVersion[2])) return true
			if (Number(allowedVersion[2]) > Number(appVersion[2])) return false

			return true
		}

		const isAllow = isAllowVersion(minVersionArray, currentVersionArray)


		console.log(isAllow)
		if (!isAllow) {
			Alert.alert('업데이트가 필요합니다.', '', [
				{
					onPress: () =>
						//TODO ios 만들때 url 분리해야함.
					{
						if (Platform.OS === 'android') {
							Linking.openURL('https://play.google.com/store/apps/details?id=io.nextruck.trucker')
						}
					},
					text: '업데이트 하기',
				},
			])
		}
	}

	useEffect(() => {
		setIsNavigationReady(true)
		getTokenFromStorage()
	}, [])

	return (
		<QueryClientProvider client={queryClientRef.current}>
			<NavigationContainer ref={_navigationRef}>
				<Stack.Navigator
					screenOptions={{
						headerBackTitleVisible: false,
					}}>
					<Stack.Screen
						name={'LoginScreen'}
						component={LoginScreen}
						options={{ headerShown: false, headerBackTitleVisible: false }}
					/>
					<Stack.Screen
						name={'HomeScreen'}
						component={HomeScreen}
						options={{ headerShown: false, headerBackTitleVisible: false }}
					/>
					<Stack.Screen
						name={'WebViewScreen'}
						component={WebViewScreen}
						options={({ route }: WebviewType) => ({
							title: route.params.title || '',
							headerStyle: { backgroundColor: Colors.WHITE },
							headerTitleStyle: { fontWeight: 'bold', color: Colors.DEER_BLACK, fontSize: 16 },
							headerTintColor: Colors.DEER_BLACK,
							headerBackTitleVisible: false,
						})}
					/>
					<Stack.Screen
						name={'ReceiptCameraScreen'}
						component={ReceiptCameraScreen}
						options={{
							headerTitle: '인수증 보내기',
							headerStyle: { backgroundColor: Colors.WHITE },
							headerTitleStyle: { fontWeight: 'bold', color: Colors.DEER_BLACK, fontSize: 16 },
							headerTintColor: Colors.DEER_BLACK,
							headerBackTitleVisible: false,
						}}
					/>
					<Stack.Screen
						name={'UploadReceiptScreen'}
						component={UploadReceiptScreen}
						options={{
							headerTitle: '인수증 보내기',
							headerStyle: { backgroundColor: Colors.WHITE },
							headerTitleStyle: { fontWeight: 'bold', color: Colors.DEER_BLACK, fontSize: 16 },
							headerTintColor: Colors.DEER_BLACK,
							headerBackTitleVisible: false,
						}}
					/>
					<Stack.Screen
						name={'GetPhotoScreen'}
						component={GetPhotoScreen}
						options={{
							headerTitle: '인수증 보내기',
							headerStyle: { backgroundColor: Colors.WHITE },
							headerTitleStyle: { fontWeight: 'bold', color: Colors.DEER_BLACK, fontSize: 16 },
							headerTintColor: Colors.DEER_BLACK,
							headerBackTitleVisible: false,
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</QueryClientProvider>
	)
}

export default App
