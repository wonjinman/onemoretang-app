import React, { useEffect, useRef, useState } from 'react'
import { Alert, TextInput, TouchableOpacity, View } from 'react-native'
import { Font } from 'common/components/atoms/Font'
import { Colors } from 'common/constants/colors'
import { LoginDto } from '../common/api/dtos'
import { useUserStore } from '../driver/stores'
import { useLogin } from '../driver/api/hooks'
import { callToManager } from '../common/utils'
import { navigation } from '../common/navigation'
import analytics from '@react-native-firebase/analytics';

const LoginScreen = () => {
	const phoneNumberInputRef = useRef<TextInput>(null)
	const passwordInputRef = useRef<TextInput>(null)
	const [phoneNumber, setPhoneNumber] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const login = useLogin()
	const updateDriverAccount = useUserStore(state => state.updateProfileFromToken)
	const onLoginButtonPress = async (phone: string, pwd: string) => {
		if (phone.length < 10) {
			Alert.alert('휴대폰번호를 정확히 입력해주세요!', '예시) 01012345678')
			return
		}
		if (pwd.length < 1) {
			callToManager(
				'비밀번호를 정확히 입력해주세요',
				'비밀번호를 잊으셨다면, "전화걸기" 버튼을 눌러 담당자에게 문의해주세요!',
			)
			return
		}
		const loginDto: LoginDto = {
			phone: phone.split('-').join('').trim(),
			password: pwd,
		}
		const response = await login.mutateAsync(loginDto)
		//TODO updateDriverAccount를 여기에서 하는 게 맞는지. 로직 분리 필요! 현재 App.tsx useEffect에서 이 함수 호출 중

		if (response) {
			navigation.setRoot('HomeScreen')
			updateDriverAccount()
		}
	}

	useEffect(() => {
		phoneNumberInputRef?.current?.focus()
	}, [])

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: Colors.WHITE,
				justifyContent: 'center',
				paddingHorizontal: 24,
			}}>
			<View style={{ marginBottom: 12 }}>
				<Font style={{ fontSize: 24, fontWeight: 'bold' }}>한 탕 더</Font>
			</View>
			<Font
				style={{
					fontSize: 18,
					fontWeight: 'bold',
					color: Colors.DEER_BLACK,
					marginBottom: 12,
				}}>
				{'한 탕, 더!'}
			</Font>

			<View
				style={{
					marginTop: 20,
					width: '100%',
					backgroundColor: Colors.DEER_GRAY_200,
					paddingVertical: 4,
				}}>
				<TextInput
					ref={phoneNumberInputRef}
					style={{ fontSize: 20, color: Colors.TEXT_BLACK }}
					keyboardType={'numeric'}
					placeholder={'핸드폰 번호를 입력하세요'}
					onChangeText={(phone: string) => {
						setPhoneNumber(phone)
						if (phone?.length === 11) passwordInputRef?.current?.focus()
					}}
					placeholderTextColor={Colors.SUB_GRAY}
					selectionColor={Colors.SUB_YELLOW}
					value={phoneNumber}
					maxLength={11}
					blurOnSubmit={false}
					onSubmitEditing={() => {
						passwordInputRef?.current?.focus()
					}}
				/>
			</View>
			<View
				style={{
					marginTop: 10,
					width: '100%',
					backgroundColor: Colors.DEER_GRAY_200,
					paddingVertical: 4,
				}}>
				<TextInput
					ref={passwordInputRef}
					style={{ fontSize: 20, color: Colors.TEXT_BLACK }}
					keyboardType={'default'}
					placeholder={'비밀번호를 입력하세요'}
					onChangeText={setPassword}
					placeholderTextColor={Colors.SUB_GRAY}
					selectionColor={Colors.SUB_YELLOW}
					autoCorrect={false}
					secureTextEntry
					blurOnSubmit={false}
					onSubmitEditing={() => {
						onLoginButtonPress(phoneNumber, password)
					}}
					value={password}
				/>
			</View>

			<TouchableOpacity
				style={{
					marginTop: 20,
					width: '100%',
					backgroundColor: Colors.MAIN_YELLOW,
					justifyContent: 'center',
					alignItems: 'center',
					height: 53,
				}}
				onPress={() => {
					onLoginButtonPress(phoneNumber, password)
				}}>
				<Font
					style={{
						fontWeight: 'bold',
						fontSize: 18,
						color: Colors.DEER_BLACK,
					}}>
					로그인
				</Font>
			</TouchableOpacity>
		</View>
	)
}

export default LoginScreen
