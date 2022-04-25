import {
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ResponseDto } from 'src/app/utils';
import BookEntity from '../entities/book.entity';

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
  readonly artist: string;

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

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    minLength: 4,
    maxLength: 4,
    default: 2022,
  })
  readonly year?: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    minLength: 5,
    maxLength: 5,
    default: 'en-EN',
  })
  readonly language?: string;
}

export class CreateBookDto extends PickType(BookDto, [
  'author',
  'artist',
  'title',
  'description',
  'year',
  'language',
] as const) {}

export class UpdateBookDto extends CreateBookDto {}

export class PatchBookDto extends PartialType(UpdateBookDto) {}

export class ResponseBookDto extends ResponseDto {
  @Expose()
  readonly id: string;
  @Expose()
  readonly author: string;
  @Expose()
  readonly artist: string;
  @Expose()
  readonly title: string;
  @Expose()
  readonly description?: string;
  @Expose()
  readonly image: string;
  @Expose()
  readonly year?: string;
  @Expose()
  readonly language?: string;

  constructor(entity: BookEntity) {
    super();
    Object.assign(this, entity);
  }
}
