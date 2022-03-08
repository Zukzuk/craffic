import { IsString, Matches } from 'class-validator';
import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { BaseUserDto, UserDto } from '../users/users.dto';

export class RegisterDto extends BaseUserDto {
  @IsString()
  @ApiPropertyOptional({
    description: 'Has to match a regular expression: /^\\+[1-9]\\d{1,14}$/',
    example: '+123123123123',
  })
  @Matches(/^\+[1-9]\d{1,14}$/)
  readonly phoneNumber?: string;
}

export class LogInDto extends PickType(UserDto, [
  'email',
  'password',
] as const) {}
