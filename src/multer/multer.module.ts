import { BadRequestException, Global, Module } from '@nestjs/common'
import { MulterService } from './multer.service'
import multer from 'multer'
import { MulterModule as Multer } from '@nestjs/platform-express'

@Global()
@Module({
	imports: [
		Multer.register({
			storage: multer.memoryStorage(),
			fileFilter: (req, file, callback) => {
				if (!file.mimetype.startsWith('image/')) {
					return callback(
						new BadRequestException('Разрешено только изображения'),
						false
					)
				}
				callback(null, true)
			}
		})
	],
	providers: [MulterService],
	exports: [Multer, MulterService]
})
export class MulterModule {}
