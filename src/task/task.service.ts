import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto'
import { promises as fs } from 'fs'
import { MulterService } from '../multer/multer.service'

@Injectable()
export class TaskService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly multerService: MulterService
	) {}

	getAll() {
		const tasks = this.prismaService.task.findMany({
			orderBy: {
				id: 'asc'
			},
			include: {
				completed: true
			}
		})
		return tasks
	}

	private async getUnique(id: number) {
		const task = await this.prismaService.task.findUnique({
			where: { id }
		})

		if (!task) {
			throw new NotFoundException('Задания с такой id отсутствует')
		}

		return task
	}

	async create(dto: CreateTaskDto, image: Express.Multer.File) {
		if (!image) {
			throw new BadRequestException('Отсутствует обложка задания')
		}

		const imagePath = await this.multerService.createFile(image)

		const task = await this.prismaService.task.create({
			data: { ...dto, imagePath }
		})

		return task
	}

	async update(
		id: number,
		dto: UpdateTaskDto,
		image: Express.Multer.File | undefined
	) {
		const task = await this.getUnique(id)

		if (image) {
			await this.multerService.deleteFile(task.imagePath)

			const imagePath = await this.multerService.createFile(image)

			dto.imagePath = imagePath
		}

		await this.prismaService.task.update({
			where: { id },
			data: dto
		})

		return { message: `Задача ${task.title} успешно обновлена` }
	}

	async delete(id: number) {
		const task = await this.getUnique(id)

		await this.prismaService.task.delete({
			where: { id }
		})

		await this.multerService.deleteFile(task.imagePath)

		return { message: `Задача ${task.title} успешно удалена` }
	}
}
