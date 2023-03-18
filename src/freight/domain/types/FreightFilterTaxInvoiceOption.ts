import { OrderFreightCardEntity } from './OrderFreightCardEntity'

export type FreightFilterTaxInvoiceOption = 'ALL' | 'NOT_ISSUED' | 'IN_PROGRESS_OR_ISSUED'
export const freightFilterTaxInvoiceOptions: FreightFilterTaxInvoiceOption[] = [
	'ALL',
	'NOT_ISSUED',
	'IN_PROGRESS_OR_ISSUED',
]

export const KorFreightTaxInvoiceFilterOptions: {
	[x in FreightFilterTaxInvoiceOption]: [string, (entity: OrderFreightCardEntity) => boolean]
} = {
	ALL: ['전체', () => true],
	NOT_ISSUED: ['발행 전', e => !e.taxInvoiceIssued],
	IN_PROGRESS_OR_ISSUED: ['발행 완료', e => e.taxInvoiceIssued],
}
