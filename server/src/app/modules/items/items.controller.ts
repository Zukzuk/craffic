import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import PermissionGuard from '../auth/abac/permission.guard';
import ItemClaims from './claims/item.claim';
import { CreateItemDto, UpdateItemDto, PatchItemDto } from './dtos/item.dto';
import { ItemsService } from './items.service';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @ApiOperation({
    summary: 'Create a new Item',
  })
  @Post()
  @UseGuards(PermissionGuard(ItemClaims.CanCreateItem))
  create(@Body() itemData: CreateItemDto) {
    return this.itemsService.create(itemData);
  }

  @ApiOperation({
    summary: 'Get the Items collection',
  })
  @Get()
  @UseGuards(PermissionGuard(ItemClaims.CanReadAllItems))
  findAll() {
    return this.itemsService.findAll();
  }

  @ApiOperation({
    summary: 'Get an Item by ID',
  })
  @Get(':id')
  @UseGuards(PermissionGuard(ItemClaims.CanReadItem))
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update an Item by ID',
  })
  @Put(':id')
  @UseGuards(PermissionGuard(ItemClaims.CanUpdateItem))
  update(@Param('id') id: string, @Body() itemData: UpdateItemDto) {
    return this.itemsService.update(+id, itemData);
  }

  @ApiOperation({
    summary: 'Update a part of an Item by ID',
  })
  @Patch(':id')
  @UseGuards(PermissionGuard(ItemClaims.CanUpdateItem))
  patch(@Param('id') id: string, @Body() partialItemData: PatchItemDto) {
    return this.itemsService.patch(+id, partialItemData);
  }

  @ApiOperation({
    summary: 'Remove an Item by ID',
  })
  @Delete(':id')
  @UseGuards(PermissionGuard(ItemClaims.CanDeleteItem))
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
