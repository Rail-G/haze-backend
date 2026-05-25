import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Query,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { NewsService } from './news.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { CreateNewsRequest, DeleteImageDto } from './dto/create-news.dto'
import { MulterService } from '../multer/multer.service'

@Controller('news')
export class NewsController {
	constructor(
		private readonly newsService: NewsService,
		private readonly multerService: MulterService
	) {}

	@Post()
	@UseInterceptors(FileInterceptor('image'))
	create(
		@Body() dto: CreateNewsRequest,
		@UploadedFile() image: Express.Multer.File
	) {
		return this.newsService.create(dto, image)
	}

	@Get('last')
	getLast() {
		return this.newsService.getLast()
	}

	@Get('partial')
	getPartial(@Query('cursorId', ParseIntPipe) id: number) {
		return this.newsService.getPartial(id)
	}

	@Get(':id')
	get(@Param('id', ParseIntPipe) id: number) {
		return this.newsService.get(id)
	}

	@Delete(':id')
	delete(@Param('id', ParseIntPipe) id: number) {
		return this.newsService.delete(id)
	}
}
