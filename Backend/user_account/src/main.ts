import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useStaticAssets('assets');
  app.enableCors({
    origin: [
      'http://localhost:5174',
      'http://localhost:3000',
      'localhost:5174',
    ],
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
