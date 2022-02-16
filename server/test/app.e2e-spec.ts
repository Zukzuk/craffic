import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ItemModule } from '../src/app/item/item.module';

describe('TestController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ItemModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // it('/test (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/items/1')
  //     .expect(200)
  //     .expect()
  // });
});
