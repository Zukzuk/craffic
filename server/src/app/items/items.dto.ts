import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class BaseItemDto {
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
export class AllOptionalItemDto extends PartialType(BaseItemDto) {}
