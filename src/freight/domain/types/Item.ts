import { TimeStampMixin } from '../../../common/domain/types'
import { Broker } from '../../../common/domain/types'

export interface Item extends TimeStampMixin {
	id: number
	brokerId: number
	broker?: Broker
	itemNumber: string | null
	name: string
	quantity: number
	weight: string
	width: string | null
	height: string | null
	length: string | null
	volume: string | null
	craneType: string | null
	notice: string | null
}
