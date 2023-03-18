import { Freight } from './Freight'
import { BrokerAccount } from '../../../common/domain/types'

export * from './FavoriteFreightFilter'
export * from './Freight'
export * from './FreightCorrectionRequest'
export * from './FreightDocument'
export * from './FreightReceiptImage'
export * from './Item'
export * from './Location'
export * from './Memo'
export * from './Shipper'
export * from './FreightFilterTimeOption'
export * from './FreightFilterTaxInvoiceOption'
export * from './OrderFreightCardEntity'

// FIXME: OrderFreightEntity 이거 모두 없애자. 이거 계속 두면 여기서 에러 계속 날 거다!
export const flattenFreightToOrderFreight = (freight: Freight) => ({
	id: freight.id,
	createdAt: freight.createdAt,
	status: freight.status,
	charge: freight.charge,
	loadingTime: freight.loadingTime,
	loadingLocation: freight.loadingLocation, //
	landingTime: freight.landingTime,
	landingLocation: freight.landingLocation, //

	/** 당착/야상/내상, 더 나은 네이밍 필요 */
	loadingTimeType: freight.landingTimeType,
	itemName: freight.itemName,
	itemWeight: freight.itemWeight,
	itemNotice: freight.itemNotice,
	truckPayloadCapacity: freight.truck?.payloadCapacity,
	truckBodyType: freight.truck?.bodyType,

	/** 동일한 하차지에서 화물별로 수령 업체가 다른 경우 ex. 건설현장 */
	receiverCompanyName: freight.receiverCompanyName,
	detailedLoadingPosition: freight.detailedLoadingPosition,
	detailedLandingPosition: freight.detailedLandingPosition,
	updatedAt: freight.updatedAt,

	isReceiptTaken: freight.document.isReceiptTaken,
	receiptImages: freight.document.receiptImages,
	//taxBill: freight.document.taxInvoiceStatus,
	taxInvoiceStatus: freight.document.taxInvoiceStatus,
	correctionRequests: freight.correctionRequests,

	shipperName: freight?.shipper?.name,

	document: freight.document,

	brokerAccount: freight.brokerAccount,
})

export type OrderFreightEntity = ReturnType<typeof flattenFreightToOrderFreight>
