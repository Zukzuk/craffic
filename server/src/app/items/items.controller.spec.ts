import { Test, TestingModule } from '@nestjs/testing';
import { BaseItemDto, PartialItemDto } from './items.dto';
import { ExtractorService } from '../providers/extractor.service';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

describe('ItemsController', () => {
  let controller: ItemsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [ItemsService, ExtractorService],
    }).compile();

    controller = app.get<ItemsController>(ItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return a the newly created resource on id: 2', async () => {
      const newItem: BaseItemDto = {
        author: 'Kees Klomp',
        title: 'Nou Breekt Mn Klomp',
        image: 'image',
      };
      expect(await controller.create(newItem)).toStrictEqual({
        id: 2,
        author: 'Kees Klomp',
        title: 'Nou Breekt Mn Klomp',
        image: 'image',
      });
    });
  });

  describe('findAll', () => {
    it('should return the full Item collection', async () => {
      expect(await controller.findAll()).toStrictEqual([
        {
          id: 1,
          author: 'Dave Timmerman',
          title: 'Cheesy Moon',
          image:
            'https://cdn3.vectorstock.com/i/1000x1000/82/17/moon-cheese-vector-5058217.jpg',
        },
      ]);
    });
  });

  describe('findOne', () => {
    it('should return an Item on id: 1', async () => {
      expect(await controller.findOne('1')).toStrictEqual({
        id: 1,
        author: 'Dave Timmerman',
        title: 'Cheesy Moon',
        image:
          'https://cdn3.vectorstock.com/i/1000x1000/82/17/moon-cheese-vector-5058217.jpg',
      });
    });
  });

  describe('update', () => {
    it('should return an updated Item on id: 1', async () => {
      const updateItem: BaseItemDto = {
        author: 'Kees Klomp',
        title: 'Nou Breekt Mn Klomp',
        image: 'image',
      };
      expect(await controller.update('1', updateItem)).toStrictEqual({
        id: 1,
        author: 'Kees Klomp',
        title: 'Nou Breekt Mn Klomp',
        image: 'image',
      });
    });
  });

  describe('patch', () => {
    it('should return a patched Item on id: 1', async () => {
      const patchItem: PartialItemDto = {
        author: 'Kees Klomp',
      };
      expect(await controller.patch('1', patchItem)).toStrictEqual({
        id: 1,
        author: 'Kees Klomp',
        title: 'Cheesy Moon',
        image:
          'https://cdn3.vectorstock.com/i/1000x1000/82/17/moon-cheese-vector-5058217.jpg',
      });
    });
  });

  describe('delete', () => {
    it('should remove the Item on id: 1', async () => {
      expect(await controller.remove('1')).toStrictEqual(
        'Succesfully removed Item with id: 1',
      );
    });
  });
});
