import { Test, TestingModule } from '@nestjs/testing';
import { createItemDto, patchItemDto, updateItemDto } from '../dto/item.dto';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

describe('ItemController', () => {
  let testController: ItemController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [ItemService],
    }).compile();

    testController = app.get<ItemController>(ItemController);
  });

  describe('create', () => {
    it('should return an Item on id: 1', async () => {
      const newItem: createItemDto = {
        author: 'Kees Klomp',
        title: 'Nou Breekt Mn Klomp',
        image: 'image',
      };
      expect(await testController.create(newItem)).toStrictEqual(undefined);
    });
  });

  describe('findAll', () => {
    it('should return the full Item collection', async () => {
      expect(await testController.findAll()).toStrictEqual([
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
      expect(await testController.findOne('1')).toStrictEqual({
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
      const updateItem: updateItemDto = {
        author: 'Kees Klomp',
        title: 'Nou Breekt Mn Klomp',
        image: 'image',
      };
      expect(await testController.update('1', updateItem)).toStrictEqual({
        id: 1,
        author: 'Kees Klomp',
        title: 'Nou Breekt Mn Klomp',
        image: 'image',
      });
    });
  });

  describe('patch', () => {
    it('should return a patched Item on id: 1', async () => {
      const patchItem: patchItemDto = {
        author: 'Kees Klomp',
      };
      expect(await testController.patch('1', patchItem)).toStrictEqual({
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
      expect(await testController.remove('1')).toStrictEqual(
        'Succesfully removed Item with id: 1',
      );
    });
  });
});
