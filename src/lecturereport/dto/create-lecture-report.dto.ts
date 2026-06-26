import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateLectureReportDto {
	@IsString({ message: 'Количество должно быть строкой' })
	@IsNotEmpty({ message: 'Это поле обязательна для заполнения' })
	count: string

	@IsString({ message: 'Текст вмешательство должно быть строкой' })
	@IsNotEmpty({ message: 'Это поле обязательна для заполнения' })
	intervention: string

	@IsArray({ message: 'Должен быть массив имен и фамилии сотрудников' })
	@IsString({
		message: 'Имена и фамилия сотрудников должны быть строкой',
		each: true
	})
	staffs: string[] | []

	@IsString({ message: 'ID программы обучения должен быть строкой' })
	@IsNotEmpty({ message: 'Это поле обязательна для заполнения' })
	lectureId: string
}
