import { create } from 'zustand'
import * as Sentry from '@sentry/react-native'
import { fetchMyProfile } from '../api/hooks'
import { LatLng } from '../../common/domain/types'
import { DriverProfile } from '../domain/types'

interface UserStore {
	profile: DriverProfile | null
	userLocation: LatLng | null
	updateProfileFromToken: () => void
	setUserLocation: (position: LatLng) => void
	currentBrokerId: number
	setCurrentBrokerId: (brokerId: number) => void
}

export const useUserStore = create<UserStore>((set, get) => ({
	profile: null,
	updateProfileFromToken: async () => {
		const profile = await fetchMyProfile()
		set({ profile })
		if (profile) {
			const { id, driverAccount, phone, name } = profile
			Sentry.setUser({
				id: `${driverAccount.role}-${id}`,
				driverId: profile.id,
				accountId: driverAccount.id,
				role: driverAccount.role,
				phone,
				name,
			})
		}
	},
	//FIXME 나라물류용 brokerId. 추후 API로 값을 불러와서 setBrokerId를 활용한다.
	currentBrokerId: __DEV__ ? 13 : 8,
	userLocation: null,
	setUserLocation: (position: LatLng) => set({ userLocation: position }),
	setCurrentBrokerId: (brokerId: number) => set({ currentBrokerId: brokerId }),
}))
