import {
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

class BookDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

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

export class CreateBookDto extends PickType(BookDto, [
  'author',
  'title',
  'description',
  'image',
] as const) {}

export class UpdateBookDto extends CreateBookDto {}

export class PatchBookDto extends PartialType(UpdateBookDto) {}
