import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

const pkg = require('../package'); // eslint-disable-line

async function bootstrap() {
  // Initialize NestJS app
  const app = await NestFactory.create(AppModule);

  // To be able to read cookies easily
  app.use(cookieParser());

  // Add global validation
  app.useGlobalPipes(new ValidationPipe());

  // Add Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Craffic API')
    .setDescription(pkg.description)
    .setVersion(pkg.version)
    .setExternalDoc('Download JSON Specs', 'json')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // serve
  const port = process.env.NESTJS_PORT ?? 4000;
  await app.listen(port);
}
bootstrap();
