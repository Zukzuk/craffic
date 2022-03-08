import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional()
  readonly userName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional()
  readonly lastName?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(12)
  @ApiProperty()
  readonly password: string;
}

export class BaseUserDto extends PickType(UserDto, [
  'email',
  'name',
  'userName',
  'lastName',
  'password',
] as const) {}
