import { TimeStampMixin } from './TimeStampMixin'

export enum AccountRole {
	ADMIN = 'ADMIN',
	CS = 'CS',
	BROKER_DISPATCHER = 'BROKER_DISPATCHER',
	BROKER_ACCOUNTANT = 'BROKER_ACCOUNTANT',
	DRIVER = 'DRIVER',
	SHIPPER = 'SHIPPER',
}

export interface BrokerAccount extends TimeStampMixin {
	id: number
	phone: string
	name: string
}
