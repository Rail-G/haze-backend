import {
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength,
	Validate
} from 'class-validator'
import { CustomPasswordType } from '../validator/CustomPasswordTypr'

export class RegisterDto {
	@IsNotEmpty({ message: 'Это поле обязательная для заполнения' })
	@IsString({ message: 'Имя должно быть строкой' })
	@MinLength(2, { message: 'Слишком короткое имя' })
	@MaxLength(15, { message: 'Слишком длинное имя' })
	firstName: string

	@IsNotEmpty({ message: 'Это поле обязательная для заполнения' })
	@IsString({ message: 'Фамилия должно быть строкой' })
	@MinLength(2, { message: 'Слишком короткое фамилия' })
	@MaxLength(15, { message: 'Слишком длинное фамилия' })
	lastName: string

	@IsString({ message: 'Пароль должен быть строкой' })
	@IsNotEmpty({ message: 'Это поле обязательная для заполнения' })
	@MinLength(8, { message: 'Пароль должен быть не менее 8 символов' })
	@Validate(CustomPasswordType, {
		message:
			'Должен содержать не менее 1 заглавную букву, 1 число и 1 специальный символ'
	})
	password: string
}

export class LoginDto extends RegisterDto {}
