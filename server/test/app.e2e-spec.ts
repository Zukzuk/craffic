import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BooksModule } from '../src/app/modules/books/books.module';

describe('TestController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BooksModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/items (GET)', () => {
    return request(app.getHttpServer()).get('/items/1').expect(200);
  });
});
