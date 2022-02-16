import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class createItemDto {
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

export class updateItemDto extends createItemDto {}

export class patchItemDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly author?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly description?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly image?: string;
}
