import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from '../../users/dtos/user.dto';

export class LogInDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}

export class UpdatePasswordDto extends PickType(CreateUserDto, [
  'password',
] as const) {}
