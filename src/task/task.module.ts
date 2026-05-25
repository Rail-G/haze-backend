import { Module } from '@nestjs/common'
import { TaskService } from './task.service'
import { TaskController } from './task.controller'
import { MulterModule } from '../multer/multer.module'

@Module({
	imports: [MulterModule],
	controllers: [TaskController],
	providers: [TaskService]
})
export class TaskModule {}
