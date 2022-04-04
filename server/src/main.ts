import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
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
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Add global class serializer interceptor
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll',
    }),
  );

  // Add Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Craffic API')
    .setDescription(pkg.description)
    .setVersion(pkg.version)
    .setExternalDoc('Download JSON Specs', 'json')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // serve
  const port = process.env.NESTJS_PORT ?? 4000;
  await app.listen(port);
}
bootstrap();
