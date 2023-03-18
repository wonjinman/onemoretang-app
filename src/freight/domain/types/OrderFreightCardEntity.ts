import { OrderFreightEntity } from './index'
import { FreightDocumentTaxInvoiceStatus } from '../enums/FreightDocumentTaxInvoiceStatus'

export type OrderFreightCardEntity = OrderFreightEntity & {
	taxInvoiceIssued: boolean
	receiptImageAttached: boolean
}

export const toOrderFreightCardEntity: (e: OrderFreightEntity) => OrderFreightCardEntity = e => ({
	...e,
	taxInvoiceIssued:
		e.document.taxInvoiceStatus === FreightDocumentTaxInvoiceStatus.ISSUED ||
		e.document.taxInvoiceStatus === FreightDocumentTaxInvoiceStatus.IN_PROGRESS,
	receiptImageAttached: e.receiptImages.length > 0,
})
