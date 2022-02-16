import { Module } from '@nestjs/common';

// modules
import { ItemModule } from './app/item/item.module';

@Module({
  controllers: [],
  providers: [],
  imports: [ItemModule],
})
export class AppModule {}
