import { IsNumberString, IsString, Length } from 'class-validator'

export class LoginDto {
	@IsNumberString()
	@Length(8, 12)
	phone: string

	@IsString()
	password: string
}
