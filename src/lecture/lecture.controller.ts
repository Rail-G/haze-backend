import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post
} from '@nestjs/common'
import { LectureService } from './lecture.service'
import { CreateLectureDto, UpdateLectureDto } from './dto/create-lecture.dto'

@Controller('lecture')
export class LectureController {
	constructor(private readonly lectureService: LectureService) {}

	@Get()
	getLast() {
		return this.lectureService.getLast()
	}

	@Post()
	create(@Body() dto: CreateLectureDto) {
		return this.lectureService.create(dto)
	}

	@Patch(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: UpdateLectureDto
	) {
		return this.lectureService.update(id, dto)
	}

	@Delete(':id')
	delete(@Param('id', ParseIntPipe) id: number) {
		return this.lectureService.delete(id)
	}
}
