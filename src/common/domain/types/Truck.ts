import { TimeStampMixin } from './TimeStampMixin'
import { Vehicle } from '../enums/Vehicle'

export interface Truck extends TimeStampMixin {
	id: number
	payloadCapacity: number
	bodyType: Vehicle
	addOn: string | null
}
