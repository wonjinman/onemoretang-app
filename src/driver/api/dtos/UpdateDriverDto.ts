import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator'
import { DriverAvailability } from '../../domain/enums/DriverAvailability'
import { FreightTimeOption } from '../../../freight/domain/enums'

export class UpdateDriverDto {
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	name?: string

	@IsInt({ each: true })
	@IsPositive({ each: true })
	@IsOptional()
	favoredLoadingRegionIds?: number[]

	@IsInt({ each: true })
	@IsPositive({ each: true })
	@IsOptional()
	favoredLandingRegionIds?: number[]

	@IsEnum(FreightTimeOption, { each: true })
	@IsOptional()
	favoredFreightTimeOptions?: FreightTimeOption[]

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	homeAddress?: string | null

	@IsInt()
	@IsPositive()
	@IsOptional()
	homeRegionId?: number | null

	constructor(partial: Partial<UpdateDriverDto>) {
		Object.assign(this, partial)
	}
}
