import {
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, IsArray } from 'class-validator';
import { ResponseDto } from 'src/app/utils';
import { ROLES } from '../../auth/abac/auth.roles';
import BookEntity from '../../books/entities/book.entity';
import AddressEntity from '../entities/address.entity';

class UserDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    maxLength: 300,
    default: 'dave.timmerman@gmail.com',
  })
  readonly email: string;

  @IsString()
  @ApiPropertyOptional({
    maxLength: 300,
    default: 'Zukzuk',
  })
  readonly userName?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    maxLength: 300,
    default: 'Dave',
  })
  readonly name: string;

  @IsString()
  @ApiPropertyOptional({
    maxLength: 300,
    default: 'Timmerman',
  })
  readonly lastName?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    minLength: 12,
    default: 'testpassword',
  })
  readonly password: string;

  @IsString()
  public refreshToken: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    default: [ROLES.WEBCLIENT_USER],
  })
  readonly roles: ROLES[];

  @IsArray()
  readonly address: AddressEntity;

  @IsArray()
  readonly books: BookEntity[];
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
