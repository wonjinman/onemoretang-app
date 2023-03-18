import { create } from 'zustand'

interface GeolocationStore {
	watchPositionEnabled: boolean
	startWatching: () => void
	stopWatching: () => void
}

export const useGeolocationStore = create<GeolocationStore>(set => ({
	watchPositionEnabled: false,
	startWatching: () => set({ watchPositionEnabled: true }),
	stopWatching: () => set({ watchPositionEnabled: false }),
}))
