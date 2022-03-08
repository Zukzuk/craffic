import { Test, TestingModule } from '@nestjs/testing';
import { ExtractorService } from '../providers/extractor.service';
import { ItemsService } from './items.service';

describe('UsersService', () => {
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsService, ExtractorService],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
