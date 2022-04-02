import {
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { BaseDto } from '../../../../database/dtos/base.dto';

class UserDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    maxLength: 300,
    default: 'dave.timmerman@gmail.com',
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    minLength: 12,
    default: 'Whoop132!',
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
}

export class CreateUserDto extends PickType(UserDto, [
  'email',
  'userName',
  'name',
  'lastName',
  'password',
] as const) {}

export class UpdateUserDto extends PickType(CreateUserDto, [
  'email',
  'userName',
  'name',
  'lastName',
] as const) {}

export class PatchUserDto extends PartialType(UpdateUserDto) {}
