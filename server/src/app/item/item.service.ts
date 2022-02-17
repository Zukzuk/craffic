import { Injectable, NotFoundException } from '@nestjs/common';
import { createItemDto, updateItemDto, patchItemDto } from '../dto/item.dto';
import { IItem } from '../interfaces';
import { Extractor } from '../utils/extractor';

@Injectable()
export class ItemService {
  private idIndex = 0;
  private initialDto = () => {
    return {
      id: ++this.idIndex,
      author: 'Dave Timmerman',
      title: 'Cheesy Moon',
      image:
        'https://cdn3.vectorstock.com/i/1000x1000/82/17/moon-cheese-vector-5058217.jpg',
    } as IItem;
  };
  private readonly items: IItem[] = [this.initialDto()];

  create(dto: createItemDto): IItem {
    const item = { id: ++this.idIndex, ...dto } as IItem;
    this.items.push(item);
    return item;
  }

  findAll(): IItem[] {
    if (this.items !== undefined) return this.items;
    throw new NotFoundException(`Item collection could not be found`);
  }

  findOne(id: number): IItem {
    const result = this.items.reduce<IItem | false>((acc, item) => {
      if (!acc && item.id === id) acc = item;
      return acc;
    }, false);

    if (result) return result;
    throw new NotFoundException(`Item with id: ${id} could not be found`);
  }

  update(id: number, dto: updateItemDto): IItem {
    let updatedItem;
    const index = this.items.findIndex((item) => item.id === id);
    if (index >= 0) {
      const item = this.items[index];
      updatedItem = { id, ...item, ...dto } as IItem;
      this.items[index] = updatedItem;
    }

    if (updatedItem) return updatedItem;
    throw new NotFoundException(`Item with id: ${id} could not be found`);
  }

  patch(id: number, patch: patchItemDto): IItem {
    let patchedItem;
    this.items.map<IItem>((item) => {
      if (item.id === id) {
        for (const [key, value] of Object.entries(patch)) {
          item[key] = value;
        }
        patchedItem = item;
      }
      return item;
    });

    if (patchedItem) return patchedItem;
    throw new NotFoundException(`Item with id: ${id} could not be found`);
  }

  remove(id: number): string {
    const index = this.items.reduce<number>((acc, item, index) => {
      if (acc < 0 && item.id === id) acc = index;
      return acc;
    }, -1);

    if (index >= 0) {
      this.items.splice(index, 1);
      return `Succesfully removed Item with id: ${id}`;
    } else {
      throw new NotFoundException(`Item with id: ${id} could not be found`);
    }
  }

  reset() {
    try {
      this.idIndex = 0;
      this.items.splice(0, this.items.length);
      this.items.push(this.initialDto());
      this.sync();
    } catch (err) {
      throw new Error(`Error ${err} occured while resetting Items collection`);
    }
  }

  async sync() {
    const extractor = new Extractor();
    extractor.read('../library', ['FearAgent.cbz', '2000AD-2268.cbr']);
  }
}
