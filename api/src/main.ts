import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { HttpEceptionFilter } from './shared/http-exception.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const port = 4000;
  app.useGlobalFilters(new HttpEceptionFilter());
  app.use(cookieParser());
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
