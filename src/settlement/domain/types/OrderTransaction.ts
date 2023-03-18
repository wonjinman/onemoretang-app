import { BusinessLicense, newDriver } from '../../../driver/domain/types'
import { SettlementRequestStatus } from './SettlementRequestStatus'
import { BrokerWithBusinessLicense } from './BrokerWithBusinessLicense'

export type OrderTransaction = {
	id: number
	loadingDate: string
	landingDate: string // 추가되었는지 확인필요
	loadingAddress: string
	landingAddress: string
	driver: newDriver
	driverBusinessLicense: BusinessLicense
	clientName: string
	transportFee: number
	waitFee: number
	returnFee: number
	driverCharge: number
	shipperCharge: number | null
	cargoWeight: string
	dispatcherName: string
	dispatcherMemo: string
	accountantMemo: string
	isReceiptTaken: boolean // 추가되었는지 확인필요
	isConfirmed: boolean
	confirmedAt: string
	settlementRequest: {
		id: number
		status: SettlementRequestStatus
		reserved_transfer_date: string | null
		transferDate: string | null
	}
	broker: BrokerWithBusinessLicense
	createdAt: Date
	truckType: string
}
