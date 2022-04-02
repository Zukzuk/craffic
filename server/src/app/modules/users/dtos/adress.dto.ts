import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class AddressDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsString()
  @ApiProperty({
    maxLength: 300,
  })
  public street: string;

  @IsString()
  @ApiProperty({
    maxLength: 300,
  })
  public city: string;

  @IsString()
  @ApiProperty({
    maxLength: 300,
  })
  public country: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'Has to match a regular expression: /^\\+[1-9]\\d{1,14}$/',
    example: '+31625294617',
    maxLength: 50,
  })
  @Matches(/^\+[1-9]\d{1,14}$/)
  readonly phoneNumber?: string;
}

export class CreateAddressDto extends PickType(AddressDto, [
  'street',
  'city',
  'country',
  'phoneNumber',
] as const) {}
