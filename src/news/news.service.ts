import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateNewsRequest } from './dto/create-news.dto'
import { MulterService } from '../multer/multer.service'
import { DataBaseResponse } from './types/news.types'

@Injectable()
export class NewsService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly multerService: MulterService
	) {}
	async create(dto: CreateNewsRequest, image: Express.Multer.File) {
		if (!image) {
			throw new BadRequestException('Отсутствует новостная обложка')
		}

		const imagePath = await this.multerService.createFile(image)

		const news = await this.prismaService.news.create({
			data: { ...dto, imagePath }
		})

		return news
	}

	async get(id: number) {
		const news = await this.prismaService.news.findUnique({
			where: { id }
		})

		if (!news) {
			throw new NotFoundException('Новость с такой id отсутствует')
		}

		return news
	}

	async getLast() {
		const news = await this.prismaService.news.findFirst({
			orderBy: {
				id: 'desc'
			}
		})

		if (!news) {
			throw new NotFoundException('Новость отсутствует')
		}

		return news
	}

	async getPartial(cursorId: number) {
		let newsArr: DataBaseResponse[]

		if (cursorId) {
			newsArr = await this.prismaService.news.findMany({
				take: 4,
				skip: 1,
				cursor: {
					id: cursorId
				},
				orderBy: {
					id: 'desc'
				}
			})
		} else {
			newsArr = await this.prismaService.news.findMany({
				take: 4,
				orderBy: {
					id: 'desc'
				}
			})
		}

		if (!newsArr.length) {
			throw new NotFoundException('Новости отсутствует')
		}

		return newsArr
	}

	async delete(id: number) {
		const news = await this.prismaService.news.findUnique({
			where: {
				id
			}
		})

		if (!news) {
			throw new NotFoundException('Новость с такой id отсутствует')
		}

		await this.prismaService.news.delete({
			where: {
				id
			}
		})

		await this.multerService.deleteFile(news.imagePath)

		return { message: `Новость ${news.title} успешно удалена` }
	}

	// update() {}
}
