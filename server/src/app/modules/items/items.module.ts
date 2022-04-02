import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ExtractorService } from '../../providers/extractor.service';
import { ItemsController } from './items.controller';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService, ExtractorService],
  imports: [],
  exports: [],
})
export class ItemsModule {}
