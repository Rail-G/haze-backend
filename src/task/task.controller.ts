import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { TaskService } from './task.service'
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Post()
	@UseInterceptors(FileInterceptor('image'))
	create(
		@Body() dto: CreateTaskDto,
		@UploadedFile() image: Express.Multer.File
	) {
		return this.taskService.create(dto, image)
	}

	@Get()
	getAll() {
		return this.taskService.getAll()
	}

	@Patch(':id')
	@UseInterceptors(FileInterceptor('image'))
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: UpdateTaskDto,
		@UploadedFile() image: Express.Multer.File | undefined
	) {
		return this.taskService.update(id, dto, image)
	}

	@Delete(':id')
	delete(@Param('id', ParseIntPipe) id: number) {
		return this.taskService.delete(id)
	}
}
