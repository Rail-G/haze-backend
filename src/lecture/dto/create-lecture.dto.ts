import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { LectureStatus } from '../../../prisma/generated/enums'
import { PartialType } from '@nestjs/mapped-types'

export class CreateLectureDto {
	@IsString({ message: 'Текст должная быть строкой' })
	@IsNotEmpty({ message: 'Текст обязателен для заполнения' })
	text: string
}

export class UpdateLectureDto extends PartialType(CreateLectureDto) {
	@IsEnum(LectureStatus, { message: 'Неопознанный статус' })
	@IsOptional()
	status: LectureStatus
}
