export enum FreightDocumentTaxInvoiceStatus {
	BEFORE_ISSUE = 'BEFORE_ISSUE',
	ADJUST_REQUESTED_BEFORE_ISSUE = 'ADJUST_REQUESTED_BEFORE_ISSUE',
	IN_PROGRESS = 'IN_PROGRESS',
	ISSUED = 'ISSUED',
	ADJUST_REQUESTED = 'ADJUST_REQUESTED',
	DONE = 'DONE',
}

export const KorFreightDocumentTaxInvoiceStatus = new Map<FreightDocumentTaxInvoiceStatus, string>([
	[FreightDocumentTaxInvoiceStatus.BEFORE_ISSUE, '발급 전'],
	[FreightDocumentTaxInvoiceStatus.ADJUST_REQUESTED_BEFORE_ISSUE, '수정 요청(미발급)'],
	[FreightDocumentTaxInvoiceStatus.IN_PROGRESS, '전송 중'],
	[FreightDocumentTaxInvoiceStatus.ISSUED, '발급 완료'],
	[FreightDocumentTaxInvoiceStatus.ADJUST_REQUESTED, '수정세금계산서 발급 요청'],
	[FreightDocumentTaxInvoiceStatus.DONE, '확정'],
])
