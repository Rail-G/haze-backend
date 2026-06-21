import { Module } from '@nestjs/common';
import { TaskdoneService } from './taskdone.service';
import { TaskdoneController } from './taskdone.controller';
import { MulterModule } from '../multer/multer.module';

@Module({
  // imports: [MulterModule],
  controllers: [TaskdoneController],
  providers: [TaskdoneService],
})
export class TaskdoneModule {}
