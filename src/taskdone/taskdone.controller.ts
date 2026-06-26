import {
	Body,
	Controller,
	Post,
	UploadedFiles,
	UseInterceptors
} from '@nestjs/common'
import { TaskdoneService } from './taskdone.service'
import { CreateTaskDoneDto } from './dto/create-task-done.dto'
import { FilesInterceptor } from '@nestjs/platform-express'

@Controller('taskdone')
export class TaskdoneController {
	constructor(private readonly taskdoneService: TaskdoneService) {}

	@Post()
	@UseInterceptors(FilesInterceptor('imagePaths'))
	create(
		@Body() dto: CreateTaskDoneDto,
		@UploadedFiles() images: Express.Multer.File[]
	) {
		return this.taskdoneService.create(dto, images)
	}
}
