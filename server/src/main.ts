import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as chokidar from 'chokidar';
import * as glob from 'glob';

async function bootstrap() {
  // Initialize NestJS app
  const app = await NestFactory.create(AppModule);

  // Add global validation
  app.useGlobalPipes(new ValidationPipe());

  // Add Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Craffic API')
    .setDescription('A modern Graphic-Novel Library')
    .setVersion('0.0.1')
    .addTag('craffic')
    .setExternalDoc('Download JSON Specifications', '/swagger-json')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // async dirTree for offline syncing
  glob('../library/**/*/', (err, res) => {
    if (err) console.log('Error', err);
    else console.log('dirTree finds:', res);
  });

  // chokidar watcher for realtime syncing
  const watcher = chokidar.watch('../library', {
    ignored: /[\/\\]\./,
  });
  watcher.on('all', (event, path) => {
    console.log('chokidar finds:', event, path);
  });

  // serve
  await app.listen(4000);
}
bootstrap();
