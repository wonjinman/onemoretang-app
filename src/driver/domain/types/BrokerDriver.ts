import { Broker, TimeStampMixin, Truck } from '../../../common/domain/types'
import { Driver } from './Driver'

export interface BrokerDriver extends TimeStampMixin {
	id: number
	brokerId: number
	broker: Broker
	driverId: number
	driver: Driver
	name: string
	phone: string | null
	truckId: number
	truck: Truck
	truckDescription: string
	plateNumber: string
	registrationNumber: string
	isFavorite: boolean
}
