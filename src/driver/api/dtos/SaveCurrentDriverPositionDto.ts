import { IsLatitude, IsLongitude } from 'class-validator'

export class SaveCurrentDriverPositionDto {
	@IsLatitude()
	latitude: number

	@IsLongitude()
	longitude: number

	constructor(partial: Partial<SaveCurrentDriverPositionDto>) {
		Object.assign(this, partial)
	}
}
