import { TimeStampMixin } from '../../../common/domain/types/TimeStampMixin'
import { FreightReceiptImage } from './FreightReceiptImage'
import { FreightDocumentTaxInvoiceStatus } from '../enums/FreightDocumentTaxInvoiceStatus'

export interface FreightDocument extends TimeStampMixin {
	id: number
	freightId: number
	isReceiptTaken: boolean
	receiptImages: FreightReceiptImage[]
	taxInvoiceStatus: FreightDocumentTaxInvoiceStatus
	receiptTakenAt: string | null
	taxInvoiceStatusChangedAt: string | null
}
