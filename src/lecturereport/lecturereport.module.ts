import { Module } from '@nestjs/common';
import { LecturereportService } from './lecturereport.service';
import { LecturereportController } from './lecturereport.controller';

@Module({
  controllers: [LecturereportController],
  providers: [LecturereportService],
})
export class LecturereportModule {}
