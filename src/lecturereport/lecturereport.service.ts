import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLectureReportDto } from './dto/create-lecture-report.dto';
import { MulterService } from '../multer/multer.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LecturereportService {
    constructor(private readonly prismaService: PrismaService, private readonly multerService: MulterService) {}
        
        async create(dto: CreateLectureReportDto, images: Express.Multer.File[]) {
            if (!images.length) {
                throw new BadRequestException("Отчет без изображения не принимается")
            }
    
            const lecture = await this.prismaService.lecture.findUnique({
                where: {
                    id: Number(dto.lectureId)
                }
            })
    
            if (!lecture) {
                throw new BadRequestException("Программа обучения с такой ID не существует")
            }

            if (lecture.status == 'CLOSED') {
                throw new BadRequestException("Программа обучения с такой ID завершён и более недоступен")
            }

            if (lecture.status == 'WAITING') {
                throw new BadRequestException("Программа обучения с такой ID приостановлен и будет закрыт")
            }
    
            const imagePaths = await this.multerService.createFiles(images)
    
            const lectureReport = await this.prismaService.lectureReport.create({
                data: {
                    ...dto,
                    count: Number(dto.count),
                    lectureId: Number(dto.lectureId),
                    imagePaths
                }
            })
    
            return lectureReport
        }
}
