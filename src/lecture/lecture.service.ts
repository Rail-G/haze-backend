import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateLectureDto, UpdateLectureDto } from './dto/create-lecture.dto'

@Injectable()
export class LectureService {
	constructor(private readonly prismaService: PrismaService) {}

	private async getUnique(id: number) {
		const lecture = await this.prismaService.lecture.findUnique({
			where: { id }
		})

		if (!lecture) {
			throw new NotFoundException('Лекция с таким ID не найден')
		}
	}

	async getLast() {
		const lecture = await this.prismaService.lecture.findFirst({
			orderBy: {
				id: 'desc'
			},
			include: {
				reports: true
			}
		})

		return lecture
	}

	async create(dto: CreateLectureDto) {
		const lecture = await this.prismaService.lecture.create({
			data: dto
		})

		return lecture
	}

	async update(id: number, dto: UpdateLectureDto) {
		await this.getUnique(id)

		await this.prismaService.lecture.update({
			where: { id },
			data: dto
		})

		return { message: 'Лекция успешно обновлена' }
	}

	async delete(id: number) {
		await this.getUnique(id)

		await this.prismaService.lecture.delete({
			where: { id }
		})

		return { message: 'Лекция успешно удалена' }
	}
}
