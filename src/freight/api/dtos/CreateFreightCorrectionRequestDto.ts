import { IsEnum, IsInt, IsPositive, IsString, Length } from 'class-validator'
import { FreightCorrectionTargetColumn } from '../../domain/enums'

export class CreateFreightCorrectionRequestDto {
	@IsInt()
	@IsPositive()
	freightId: number

	@IsEnum(FreightCorrectionTargetColumn)
	targetColumn: FreightCorrectionTargetColumn

	@IsString()
	@Length(0, 256)
	correctedValue: string

	constructor(partial: Partial<CreateFreightCorrectionRequestDto>) {
		Object.assign(this, partial)
	}
}
