import { TimeStampMixin } from '../../../common/domain/types'

export interface Bank extends TimeStampMixin {
	id: number
	name: string
	code: string
}
