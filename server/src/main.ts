import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as chokidar from 'chokidar';
import * as glob  from 'glob';


class TreeNode {
  public path: string;
  public children: Array<TreeNode>;

  constructor(path: string) {
    this.path = path;
    this.children = [];
  }
}

async function bootstrap() {
  // Initialize NestJS app
  const app = await NestFactory.create(AppModule);

  // Add global validation
  app.useGlobalPipes(new ValidationPipe());

  // Add Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Craffic API')
    .setDescription('The Craffic API')
    .setVersion('1.0')
    .addTag('craffic')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // async dirTree for offline syncing
  function getDirectories (callback) {
    glob('../library/**/*/', callback);
  };
  getDirectories((err, res) => {
    if (err) console.log('Error', err);
    else console.log(res);
  });

  // chokidar watcher
  chokidar.watch('../library').on('all', (event, path) => {
    //console.log(event, path);
  });

  // serve
  await app.listen(4000);
}
bootstrap();
