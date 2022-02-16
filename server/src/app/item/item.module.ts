import { Module } from '@nestjs/common';

// service
import { ItemService } from './item.service';

// controller
import { ItemController } from './item.controller';

@Module({
  controllers: [ItemController],
  providers: [ItemService],
  imports: [],
  exports: [],
})
export class ItemModule {}
