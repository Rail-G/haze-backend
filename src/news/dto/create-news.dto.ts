import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateNewsRequest {
	@IsString({ message: 'Название должно быть строкой' })
	@IsNotEmpty({ message: 'Название обязательно для заполнения' })
	@MinLength(4, { message: 'Название должно превышать 4 символов' })
	@MaxLength(50, { message: 'Название не должно превышать 50 символов' })
	title: string

	@IsString({ message: 'Категория должно быть строкой' })
	@IsNotEmpty({ message: 'Категория обязательно для заполнения' })
	@MinLength(4, { message: 'Категория должно превышать 4 символов' })
	@MaxLength(20, { message: 'Категория не должно превышать 20 символов' })
	category: string

	@IsString({ message: 'Текст должен быть строкой' })
	@IsNotEmpty({ message: 'Текст обязателен для заполнения' })
	@MinLength(100, { message: 'Текст должно превышать 100 символов' })
	text: string
}

export class DeleteImageDto {
	@IsString({ message: 'Ссылка должна быть строкой' })
	@IsNotEmpty({ message: 'Ссылка обязательна для заполнения' })
	imagePath: string
}
