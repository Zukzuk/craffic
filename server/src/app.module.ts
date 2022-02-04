import { Module } from '@nestjs/common';

// modules
import { TestModule } from './app/test/test.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    TestModule
  ]
})
export class AppModule {}
