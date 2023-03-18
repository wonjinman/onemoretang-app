import { TimeStampMixin } from './TimeStampMixin'

export interface Broker extends TimeStampMixin {
	id: number
	regionId: number | null
	name: string
}
