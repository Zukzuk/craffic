import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseItemDto, AllOptionalItemDto } from './items.dto';
import { IItem } from '../interfaces';
import { ExtractorService } from '../providers/extractor.service';

@Injectable()
export class ItemsService {
  constructor(private extractor: ExtractorService) {}

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

  async create(dto: BaseItemDto) {
    const item = { id: ++this.idIndex, ...dto } as IItem;
    await this.items.push(item);
    return item;
  }

  async findAll() {
    if (this.items !== undefined) return await this.items;
    throw new NotFoundException(`Collection could not be found`);
  }

  async findOne(id: number) {
    const result = await this.items.reduce<IItem | false>((acc, item) => {
      if (!acc && item.id === id) acc = item;
      return acc;
    }, false);

    if (result) return result;
    throw new NotFoundException(`Item with id: ${id} could not be found`);
  }

  async update(id: number, dto: BaseItemDto) {
    let updatedItem: IItem;
    const index = await this.items.findIndex((item) => item.id === id);
    if (index >= 0) {
      const item = this.items[index];
      updatedItem = { id, ...item, ...dto } as IItem;
      this.items[index] = updatedItem;
    }

    if (updatedItem) return updatedItem;
    throw new NotFoundException(`Item with id: ${id} could not be found`);
  }

  async patch(id: number, patch: AllOptionalItemDto) {
    let patchedItem: IItem;
    await this.items.map<IItem>((item) => {
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

  async remove(id: number) {
    const index = await this.items.reduce<number>((acc, item, index) => {
      if (acc < 0 && item.id === id) acc = index;
      return acc;
    }, -1);

    if (index >= 0) {
      this.items.splice(index, 1);
      return `Succesfully removed Item with id: ${id}`;
    }
    throw new NotFoundException(`Item with id: ${id} could not be found`);
  }

  async reset() {
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
    const extractedMsg = this.extractor.read('../library', [
      'FearAgentFolders.cbz',
      '2000AD-2268.cbr',
    ]);

    return extractedMsg;
  }
}
