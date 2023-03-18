import { TimeStampMixin } from '../../../common/domain/types'

export interface BankAccount extends TimeStampMixin {
	id: number
	bankId: number
	bankName: string
	holderName: string
	accountNumber: string
}
