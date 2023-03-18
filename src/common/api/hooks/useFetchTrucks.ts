import { useFetchData, UseQueryOption } from './useFetchData'
import { Truck } from '../../domain/types'

export const useFetchTrucks = (options: UseQueryOption = {}) =>
	useFetchData<Truck[]>('trucks', `/trucks`, options)
