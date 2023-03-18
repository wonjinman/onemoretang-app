import { TimeStampMixin } from './TimeStampMixin'

export interface Region extends TimeStampMixin {
	id: number
	doName: string
	latitude: number
	longitude: number
}
