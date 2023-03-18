import { BrokerDriver } from './BrokerDriver'
import { DriverAvailability } from '../enums/DriverAvailability'
import { FreightTimeOption } from '../../../freight/domain/enums'
import { DriverAccount } from './DriverAccount'

export interface Driver {
	id: number
	phone: string
	name: string
	driverAccount: DriverAccount
	pushId: string | null
	businessLicenseId: number | null
	bankAccountId: number | null
	availability: DriverAvailability
	favoredLoadingRegionIds: number[]
	favoredLandingRegionIds: number[]
	favoredFreightTimeOptions: FreightTimeOption[]
	homeAddress: string | null
	homeRegionId: number | null
	currentLatitude: number
	currentLongitude: number
}

export interface newDriver {
	id: number
	brokerDriverId: number
	driverAccountId: number
	plateNumber: string
	name: string
	phone: string
	profileImageUrl: string
}
