import { TimeStampMixin } from '../../../common/domain/types'

export interface BrokerWithBusinessLicense extends TimeStampMixin {
	id: number
	companyName: string
	registrationNumber: string
	representativeName: string
	address: string
	bizType: string | null
	bizClass: string | null
}
