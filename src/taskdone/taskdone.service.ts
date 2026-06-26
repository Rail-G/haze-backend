import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { MulterService } from '../multer/multer.service'
import { CreateTaskDoneDto } from './dto/create-task-done.dto'

@Injectable()
export class TaskdoneService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly multerService: MulterService
	) {}

	async create(dto: CreateTaskDoneDto, images: Express.Multer.File[]) {
		if (!images.length) {
			throw new BadRequestException(
				'Отчет без изображения не принимается'
			)
		}

		const task = await this.prismaService.task.findUnique({
			where: {
				id: Number(dto.taskId)
			}
		})

		if (!task) {
			throw new BadRequestException('Задача с такой ID не существует')
		}

		const imagePaths = await this.multerService.createFiles(images)

		const taskDone = await this.prismaService.taskDone.create({
			data: {
				...dto,
				taskId: Number(dto.taskId),
				imagePaths
			}
		})

		return taskDone
	}
}
