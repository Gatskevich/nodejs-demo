import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Invalid email' })
	email: string;

	@IsString({ message: 'Password not specified' })
	password: string;

	@IsString({ message: 'No name provided' })
	name: string;
}
