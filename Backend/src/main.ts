import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import  {config} from 'dotenv'

config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // app.useStaticAssets('assets');
  app.enableCors({
    origin: [
      `${process.env.FRONT_URL}`,
      // 'http://localhost:3000',
      `${process.env.FRONT_URL}`,
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
