import { IsEnum } from 'class-validator'
import { DriverAvailability } from '../../domain/enums/DriverAvailability'

export class UpdateDriverAvailabilityDto {
	@IsEnum(DriverAvailability)
	availability: DriverAvailability

	constructor(partial: Partial<UpdateDriverAvailabilityDto>) {
		Object.assign(this, partial)
	}
}
