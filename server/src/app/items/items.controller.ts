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
import { BaseItemDto, PartialItemDto } from './dtos/items.dto';
import { ItemsService } from './items.service';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @ApiOperation({
    summary: 'Create a new Item',
  })
  @Post()
  create(@Body() itemData: BaseItemDto) {
    return this.itemsService.create(itemData);
  }

  @ApiOperation({
    summary: 'Get the Items collection',
  })
  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @ApiOperation({
    summary: 'Get an Item by ID',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update an Item by ID',
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() itemData: BaseItemDto) {
    return this.itemsService.update(+id, itemData);
  }

  @ApiOperation({
    summary: 'Update a part of an Item by ID',
  })
  @Patch(':id')
  patch(@Param('id') id: string, @Body() partialItemData: PartialItemDto) {
    return this.itemsService.patch(+id, partialItemData);
  }

  @ApiOperation({
    summary: 'Remove an Item by ID',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }

  ////

  @Get('/test')
  test() {
    return this.itemsService.test();
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
