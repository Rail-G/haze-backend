import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('bye/:id')
  sayByeBye(@Param() params): string {
    return `Bye Bye ${params.id}`
  }
}
