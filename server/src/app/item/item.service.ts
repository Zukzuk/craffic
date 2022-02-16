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

  create(dto: createItemDto): void {
    const item = { id: ++this.idIndex, ...dto } as IItem;
    try {
      this.items.push(item);
    } catch (err) {
      throw new Error(`Error ${err} occured while adding new Item`);
    }
  }

  reset() {
    this.idIndex = 0;
    this.items.splice(0, this.items.length);
    this.items.push(this.initialDto());
    this.sync();
  }

  findAll(): IItem[] {
    return this.items;
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
    const index = this.items.findIndex((item) => item.id === id);
    const item = this.items[index];
    this.items[index] = { id, ...item, ...dto } as IItem;
    return this.items[index];
  }

  patch(id: number, patch: patchItemDto): IItem {
    let cachedItem;
    this.items.map<IItem>((item) => {
      if (item.id === id) {
        for (const [key, value] of Object.entries(patch)) {
          item[key] = value;
        }
        cachedItem = item;
      }
      return item;
    });
    return cachedItem;
  }

  remove(id: number): string {
    this.items.filter((item) => item.id === id);
    return `Item with id: ${id} removed`;
  }

  async sync() {
    const extractor = new Extractor();
    extractor.read('../library', ['FearAgent.cbz', '2000AD-2268.cbr']);
  }
}
