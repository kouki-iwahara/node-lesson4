import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('sdsd');
    return this.appService.getHello();
  }
  @Get('/regist')
  registUser(@Body() req): any {
    const testUser = { id: 'testID', userName: 'testName' };
    return testUser;
  }
}
