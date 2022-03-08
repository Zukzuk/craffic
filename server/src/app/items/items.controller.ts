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
import { BaseItemDto, AllOptionalItemDto } from './items.dto';
import { ItemsService } from './items.service';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @ApiOperation({
    summary: 'Create a new item',
  })
  @Post()
  create(@Body() dto: BaseItemDto) {
    return this.itemsService.create(dto);
  }

  @ApiOperation({
    summary: 'Get the item collection',
  })
  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @ApiOperation({
    summary: 'Get an item by ID',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(Number(id));
  }

  @ApiOperation({
    summary: 'Update an item by ID',
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: BaseItemDto) {
    return this.itemsService.update(Number(id), dto);
  }

  @ApiOperation({
    summary: 'Update a part of an item by ID',
  })
  @Patch(':id')
  patch(@Param('id') id: string, @Body() dto: AllOptionalItemDto) {
    return this.itemsService.patch(Number(id), dto);
  }

  @ApiOperation({
    summary: 'Remove an item by ID',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(Number(id));
  }

  @Post('/reset')
  reset() {
    return this.itemsService.reset();
  }

  @Post('/sync')
  sync() {
    return this.itemsService.sync();
  }
}