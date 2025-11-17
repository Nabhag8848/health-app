import { register } from 'tsconfig-paths';
import * as path from 'path';

const baseUrl = path.resolve(__dirname, '..');
register({
  baseUrl,
  paths: {
    '@/*': ['src/*'],
  },
});

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = app.get(ConfigService);

  // Enable CORS
  const corsOrigin = config.get<string>('CORS_ORIGIN', 'http://localhost:3001');
  app.enableCors({
    origin: corsOrigin.split(',').map((origin) => origin.trim()),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const globalPrefix = 'v1';
  app.setGlobalPrefix(globalPrefix);

  const port = config.get<number>('SERVER_PORT', 3000);

  await app.listen(port);
}

bootstrap();
