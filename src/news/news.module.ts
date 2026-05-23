import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MulterModule } from '../multer/multer.module';

@Module({
  imports: [MulterModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
