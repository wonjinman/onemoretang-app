import { IsOptional, IsUUID } from 'class-validator'

export class UpdatePushIdDto {
	@IsUUID()
	@IsOptional()
	pushId: string | null
}
