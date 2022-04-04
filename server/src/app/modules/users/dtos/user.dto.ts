import {
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ResponseDto } from 'src/app/utils';

class UserDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    maxLength: 300,
    default: 'test.user@domain.com',
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    minLength: 12,
    default: 'testpassword',
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

export class GetByEmailUserDto extends CreateUserDto {}

export class ResponseUserDto extends ResponseDto {
  @Expose()
  readonly id: string;
  @Expose()
  readonly email: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly lastName?: string;
  @Expose()
  readonly userName?: string;

  constructor(object) {
    super();
    Object.assign(this, object);
  }
}
