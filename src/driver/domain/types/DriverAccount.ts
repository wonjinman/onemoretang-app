export interface DriverAccount {
	id: number
	role: 'DRIVER'
	phone: string
	name: string
	lastLoginAt: string | null
}
