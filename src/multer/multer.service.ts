import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { promises as fs, createWriteStream } from 'fs'
import { join } from 'path'

@Injectable()
export class MulterService {
	async deleteFiles(imgList: String[]) {
		const deletePromises = imgList.map(image => {
			const filename = image.replace('uploads/', '')
			const path = join(process.cwd(), 'uploads', filename)

			return fs.unlink(path)
		})

		return Promise.all(deletePromises).catch(() => {
			throw new InternalServerErrorException(
				'Ошибка при удаления изображения'
			)
		})
	}

	async createFiles(imgList) {
		const uploadPromises = imgList.map(image => {
			const imagePath = `uploads/${Date.now()}-${image.originalname}`
			return new Promise((resolve, reject) => {
				const writeStream = createWriteStream(imagePath)
				writeStream.on('finish', () => resolve(imagePath))
				writeStream.on('error', reject)
				writeStream.write(image.buffer)
				writeStream.end()
			})
		})

		await Promise.all(uploadPromises).catch(() => {
			throw new InternalServerErrorException(
				'Ошибка при сохранения изображения'
			)
		})
	}

	async deleteFile(imgPath: String) {
		const filename = imgPath.replace('uploads/', '')
		const path = join(process.cwd(), 'uploads', filename)
		try {
			await fs.unlink(path)
		} catch (err) {
			console.error(`Failed to delete file ${path}:`, err)
		}
	}

	async createFile(image: Express.Multer.File) {
		const imagePath = `uploads/${Date.now()}-${image.originalname}`

		try {
			await fs.writeFile(imagePath, image.buffer)
		} catch (err) {
			throw new InternalServerErrorException(
				'Ошибка при сохранения изображения'
			)
		}

		return imagePath
	}
}
