import { PickType } from '@nestjs/swagger';
import { UserDto } from '../../users/dtos/users.dto';

export class LogInDto extends PickType(UserDto, [
  'email',
  'password',
] as const) {}
