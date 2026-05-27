import { Module } from '@nestjs/common'
import { LectureService } from './lecture.service'
import { LectureController } from './lecture.controller'
import { MulterModule } from '../multer/multer.module'

@Module({
	imports: [MulterModule],
	controllers: [LectureController],
	providers: [LectureService]
})
export class LectureModule {}
