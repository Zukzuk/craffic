import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RedocModule, RedocOptions } from 'nestjs-redoc';
import AppModule from './app.module';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as csurf from 'csurf';

const pkg = require('../package'); // eslint-disable-line

async function bootstrap() {
  // Initialize NestJS app
  const app = await NestFactory.create(AppModule);

  // To be able to read cookies easily
  app.use(cookieParser());

  // Mitigate cross-site request forgery (also known as CSRF or XSRF)
  // app.use(csurf());

  // Enable gzip compression
  app.use(compression());

  // Add global validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Add global interceptor, excluding all data by default
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

  // Add ReDoc documentation
  const redocOptions: RedocOptions = {
    title: 'Hello Nest',
    logo: {
      url: 'https://redocly.github.io/redoc/petstore-logo.png',
      backgroundColor: '#F0F0F0',
      altText: 'Craffic logo',
    },
    sortPropsAlphabetically: true,
    hideDownloadButton: false,
    hideHostname: false,
    auth: {
      enabled: true,
      user: 'admin',
      password: '123',
    },
    tagGroups: [
      {
        name: 'Core resources',
        tags: ['cats'],
      },
    ],
  };
  await RedocModule.setup('/docs', app, document, redocOptions);

  // serve
  const port = process.env.NESTJS_PORT ?? 4000;
  await app.listen(port);
}
bootstrap();
