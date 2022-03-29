import { PickType } from '@nestjs/swagger';
import { BaseUserDto, UserDto } from '../../users/dtos/users.dto';

export class RegistrationDto extends BaseUserDto {}

export class LogInDto extends PickType(UserDto, [
  'email',
  'password',
] as const) {}
