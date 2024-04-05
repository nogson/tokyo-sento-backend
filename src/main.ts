import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
// import * as cookieParser from 'cookie-parser';
import * as csurt from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  // TODO CSRF対策必要？？
  // app.use(cookieParser());
  await app.listen(process.env.PORT || 3005);
}
bootstrap();
