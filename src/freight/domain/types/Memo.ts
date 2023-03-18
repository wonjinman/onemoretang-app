import { TimeStampMixin } from '../../../common/domain/types'
import { Broker } from '../../../common/domain/types'

export interface Memo extends TimeStampMixin {
	id: number
	broker: Broker
	orderId: number
	freight: number
	content: string
}
