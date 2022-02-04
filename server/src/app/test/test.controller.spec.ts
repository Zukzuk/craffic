import { Test, TestingModule } from '@nestjs/testing';
import { TestController } from './test.controller';
import { TestService } from './test.service';

describe('AppController', () => {
  let testController: TestController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
      providers: [TestService],
    }).compile();

    testController = app.get<TestController>(TestController);
  });

  describe('root', () => {
    it('should return empty falsy (empty array)', () => {
      expect(testController.findAll()).toBe([]);
    });
  });
});
