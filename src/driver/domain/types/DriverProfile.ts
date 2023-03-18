import { BusinessLicense } from './BusinessLicense'
import { BankAccount } from './BankAccount'
import { Driver } from './Driver'

export interface DriverProfile extends Driver {
	businessLicense: BusinessLicense
	bankAccount: BankAccount
}
