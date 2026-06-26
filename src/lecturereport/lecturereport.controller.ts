import {
	Body,
	Controller,
	Post,
	UploadedFiles,
	UseInterceptors
} from '@nestjs/common'
import { LecturereportService } from './lecturereport.service'
import { CreateLectureReportDto } from './dto/create-lecture-report.dto'
import { FilesInterceptor } from '@nestjs/platform-express'

@Controller('lecturereport')
export class LecturereportController {
	constructor(private readonly lecturereportService: LecturereportService) {}

	@Post()
	@UseInterceptors(FilesInterceptor('images'))
	create(
		@Body() dto: CreateLectureReportDto,
		@UploadedFiles() images: Express.Multer.File[]
	) {
		return this.lecturereportService.create(dto, images)
	}
}
