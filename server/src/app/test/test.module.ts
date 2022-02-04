import { Module } from '@nestjs/common';

// service
import { TestService } from './test.service';

// controller
import { TestController } from './test.controller';

@Module({
  controllers: [TestController],
  providers: [TestService],
  imports: [],
  exports: []
})
export class TestModule {}
