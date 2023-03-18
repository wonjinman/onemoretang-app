import { useFetchData, UseQueryOption } from './useFetchData'
import { Region } from '../../domain/types'

export const useFetchRegions = (options: UseQueryOption = {}) =>
	useFetchData<Region[]>('regions', `/regions`, options)
