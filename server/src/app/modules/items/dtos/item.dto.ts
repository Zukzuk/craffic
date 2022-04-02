import {
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { BaseDto } from '../../../../database/dtos/base.dto';

class ItemDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly author: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly description?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly image: string;
}

export class CreateItemDto extends PickType(ItemDto, [
  'author',
  'title',
  'description',
  'image',
] as const) {}

export class UpdateItemDto extends CreateItemDto {}

export class PatchItemDto extends PartialType(UpdateItemDto) {}
