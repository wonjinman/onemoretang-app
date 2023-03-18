import { TimeStampMixin } from '../../../common/domain/types'
import { Broker } from '../../../common/domain/types'

export interface Shipper extends TimeStampMixin {
	id: number
	brokerId: number
	broker?: Broker
	regionId: number | null
	name: string
	address: string | null
	phone: string | null
}
