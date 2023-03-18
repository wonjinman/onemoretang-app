import { Broker, BrokerAccount, TimeStampMixin, Truck } from '../../../common/domain/types'
import { FreightStatus, FreightTimeOption } from '../enums'
import { Vehicle } from '../../../common/domain/enums/Vehicle'
import { FreightDocument } from './FreightDocument'
import { FreightCorrectionRequest } from './FreightCorrectionRequest'
import { Memo } from './Memo'
import { BrokerDriver } from '../../../driver/domain/types/BrokerDriver'
import { Shipper } from './Shipper'
import { Location } from './Location'

export interface Freight extends TimeStampMixin {
	id: number
	status: FreightStatus
	charge: number
	loadingTime: string | null
	landingTime: string | null
	landingTimeType: FreightTimeOption
	itemId: number
	itemName: string
	itemWeight?: number
	itemNotice?: string
	truckMinTonnage: number
	truckMaxTonnage: number
	truckBodyType: Vehicle
	truckId: number | null
	truck: Truck
	brokerDriverId: number | null
	brokerDriver: BrokerDriver | null
	receiverCompanyName: string | null
	detailedLoadingPosition: string | null
	detailedLandingPosition: string | null
	document: FreightDocument
	memo: Memo
	correctionRequests: FreightCorrectionRequest[]
	brokerId: number
	broker: Broker
	brokerAccountId: number
	brokerAccount: BrokerAccount
	shipperId: number
	shipper: Shipper
	loadingLocationId: number
	loadingLocation: Location
	loadingDate: string
	landingLocationId: number
	landingLocation: Location
	landingDate: string
}
