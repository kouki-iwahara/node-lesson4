import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { HttpEceptionFilter } from './shared/http-exception.filter';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpEceptionFilter());
  const port = 4000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
