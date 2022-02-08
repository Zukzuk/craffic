import { Test, TestingModule } from '@nestjs/testing';
import { TestController } from './test.controller';
import { TestService } from './test.service';

describe('TestController', () => {
  let testController: TestController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
      providers: [TestService],
    }).compile();

    testController = app.get<TestController>(TestController);
  });

  describe('findOne', () => {
    it('should return an item on id: 1', () => {
      expect(testController.findOne("1")).toStrictEqual({
        id: 1,
        name: "test1"
      });
    });
  });
});
