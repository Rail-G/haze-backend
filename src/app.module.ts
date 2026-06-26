import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { NewsModule } from './news/news.module'
import { MulterModule } from '@nestjs/platform-express'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { TaskModule } from './task/task.module'
import { LectureModule } from './lecture/lecture.module'
import { TaskdoneModule } from './taskdone/taskdone.module'
import { LecturereportModule } from './lecturereport/lecturereport.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		ServeStaticModule.forRoot(
			{
				rootPath: join(process.cwd(), 'uploads/news'),
				serveRoot: '/uploads/news'
			},
			{
				rootPath: join(process.cwd(), 'uploads/task'),
				serveRoot: '/uploads/task'
			}
		),
		PrismaModule,
		AuthModule,
		NewsModule,
		MulterModule,
		TaskModule,
		LectureModule,
		TaskdoneModule,
		LecturereportModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
