import { TimeStampMixin } from '../../../common/domain/types'
import { Broker } from '../../../common/domain/types'

export interface Location extends TimeStampMixin {
	id: number
	brokerId: number
	broker?: Broker
	name: string
	address: string
	regionId: number | null
	managerName: string | null
	managerPhone: string | null
	subManagerName: string | null
	subManagerPhone: string | null
	notice?: string | null
	latitude?: number
	longitude?: number
}
