import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { createItemDto, updateItemDto, patchItemDto } from '../dto/item.dto';
import { IItem } from '../interfaces';
import { ItemService } from './item.service';

@ApiTags('Items')
@Controller('items')
export class ItemController {
  constructor(private service: ItemService) {}

  @ApiOperation({
    summary: 'Create a new item',
  })
  @Post()
  async create(@Body() dto: createItemDto) {
    this.service.create(dto);
  }

  @ApiOperation({
    summary: 'Get the item collection',
  })
  @Get()
  async findAll(): Promise<IItem[]> {
    return this.service.findAll();
  }

  @ApiOperation({
    summary: 'Get an item by ID',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @ApiOperation({
    summary: 'Update an item by ID',
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: updateItemDto) {
    return this.service.update(Number(id), dto);
  }

  @ApiOperation({
    summary: 'Update a part of an item by ID',
  })
  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: patchItemDto) {
    return this.service.patch(Number(id), dto);
  }

  @ApiOperation({
    summary: 'Remove an item by ID',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }

  @Post('/reset')
  async reset() {
    return this.service.reset();
  }
}
