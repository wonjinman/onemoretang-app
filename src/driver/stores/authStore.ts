import { create } from 'zustand'
import { storage } from 'common/storage/storage'
import { TOKEN_KEY } from 'common/storage/storage-key'
import { navigation } from '../../common/navigation'
import { useUserStore } from './userStore'

interface AuthStore {
	accessToken: string | null
	setToken: (token: string) => void
	getTokenFromStorage: () => void
	removeToken: () => void
}

export const useAuthStore = create<AuthStore>((set, get) => ({
	accessToken: null,
	setToken: (token: string) => set({ accessToken: token }),
	getTokenFromStorage: async () => {
		const token = await storage.get(TOKEN_KEY)
		if (token !== null && token.length > 0) {
			set({ accessToken: token })
			navigation.setRoot('HomeScreen')
			//token 꺼낸 다음, driverAccount fetch해오기. zustand에서 set한 뒤 호출했기 때문에 token이 있는 상황.
			useUserStore.getState().updateProfileFromToken()
		} else {
			navigation.setRoot('LoginScreen')
		}
	},
	removeToken: () => {
		// TODO: Store 초기화 & storage 초기화 & navigation까지 하나에 모여있는 게 좋은 코드인가?
		storage.remove(TOKEN_KEY)
		set({ accessToken: null })
		navigation.setRoot('LoginScreen')
	},
}))
