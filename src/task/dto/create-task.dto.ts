import {
	ArrayMaxSize,
	IsArray,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
	Validate
} from 'class-validator'
import { CustomNumberType } from '../validator/CustomNumberType'
import { TaskStatus } from '../../../prisma/generated/enums'
import { PartialType } from '@nestjs/mapped-types'

export class CreateTaskDto {
	@IsString({ message: 'Название должно быть строкой' })
	@IsNotEmpty({ message: 'Название обязательно для заполнения' })
	@MinLength(4, { message: 'Название должно превышать 4 символа' })
	@MaxLength(50, { message: 'Название не должно превышать 50 символов' })
	title: string

	@IsString({ message: 'Описание должно быть строкой' })
	@IsNotEmpty({ message: 'Описание обязательно для заполнения' })
	@MinLength(25, { message: 'Описание должно превышать 25 символа' })
	@MaxLength(500, { message: 'Описание не должно превышать 500 символов' })
	description: string

	@IsString({ message: 'Награда должно быть число' })
	@IsNotEmpty({ message: 'Награда обязательно для заполнения' })
	@MinLength(1, { message: 'Награда обязательно для заполнения' })
	@Validate(CustomNumberType, {
		message: 'Разрешены только положительные цифры'
	})
	reward: string

	@IsOptional()
	@IsArray({ message: 'Должно быть массив условии' })
	@ArrayMaxSize(3, { message: 'Максимум 3 условия' })
	@IsString({ message: 'Каждое условие должно быть строкой', each: true })
	@MaxLength(100, {
		message: 'Условия не должно превышать 100 символов',
		each: true
	})
	conditions: string[] | []
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
	@IsEnum(TaskStatus, { message: 'Только разрешенные статусы' })
	@IsOptional()
	status: TaskStatus

	@IsString({message: 'Путь должен быть строкой'})
	@IsOptional()
	imagePath: string
}
