import {
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, Matches } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    maxLength: 300,
    default: 'user@info.com',
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    minLength: 12,
    default: '123456789098',
  })
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    maxLength: 300,
  })
  readonly name: string;

  @IsString()
  @ApiPropertyOptional({
    maxLength: 300,
  })
  readonly lastName?: string;

  @IsString()
  @ApiPropertyOptional({
    maxLength: 300,
  })
  readonly userName?: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'Has to match a regular expression: /^\\+[1-9]\\d{1,14}$/',
    example: '+123123123123',
  })
  @Matches(/^\+[1-9]\d{1,14}$/)
  readonly phoneNumber?: string;
}

export class BaseUserDto extends PickType(UserDto, [
  'email',
  'name',
  'userName',
  'lastName',
  'password',
  'phoneNumber',
] as const) {}

export class PartialUserDto extends PartialType(BaseUserDto) {}
