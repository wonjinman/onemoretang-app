import AsyncStorage from '@react-native-async-storage/async-storage'
import { StorageKey } from './storage-key'

export const storage = {
	get: async (key: StorageKey) => {
		try {
			const jsonValue = await AsyncStorage.getItem(key)
			return jsonValue != null ? JSON.parse(jsonValue) : null
		} catch (e) {
			return null
		}
	},
	set: async (key: StorageKey, value: string) => {
		try {
			const jsonValue = JSON.stringify(value)
			await AsyncStorage.setItem(key, jsonValue)
		} catch (e) {}
	},
	remove: async (key: StorageKey) => {
		await AsyncStorage.removeItem(key)
	},
}
