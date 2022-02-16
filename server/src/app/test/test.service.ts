import { Injectable, NotFoundException } from '@nestjs/common';
import { createTestDto, updateTestDto, patchTestDto } from '../dto/test.dto';
import { IBook, ITest } from '../interfaces';
import { Extractor } from '../utils/extractor';

@Injectable()
export class TestService {
  private idIndex = 0;
  private initialDto = () => {
    return { id: ++this.idIndex, name: 'test1' } as ITest;
  };
  private readonly tests: ITest[] = [this.initialDto()];

  create(dto: createTestDto): Error | void {
    const item = { id: ++this.idIndex, ...dto } as ITest;
    try {
      this.tests.push(item);
    } catch (err) {
      throw new Error(`Error ${err} occured while adding new test`);
    }
  }

  reset() {
    this.idIndex = 0;
    this.tests.splice(0, this.tests.length);
    this.tests.push(this.initialDto());
    this.sync();
  }

  findAll(): ITest[] {
    return this.tests;
  }

  findOne(id: number): ITest {
    const result = this.tests.reduce<ITest | false>((acc, item) => {
      if (!acc && item.id === id) acc = item;
      return acc;
    }, false);
    if (result) return result;
    throw new NotFoundException(`Test with id: ${id} could not be found`);
  }

  update(id: number, dto: updateTestDto): string {
    const index = this.tests.findIndex((item) => item.id === id);
    const item = this.tests[index];
    this.tests[index] = { id, ...item, ...dto } as ITest;
    return `item updated`;
  }

  patch(id: number, { name, age, breed }: patchTestDto): string {
    this.tests.map<ITest>((item) => {
      if (item.id === id) {
        if (name) item.name = name;
        if (age) item.age = age;
        if (breed) item.breed = breed;
      }
      return item;
    });
    return `item patched`;
  }

  remove(id: number): string {
    this.tests.filter((item) => item.id === id);
    return `item removed`;
  }

  async sync() {
    const extractor = new Extractor();
    extractor.read('../library', ['FearAgent.cbz', '2000AD-2268.cbr']);
    // return `detected ${book.file} with ${book.numPages} pages`;
  }
}
