import { SetMetadata } from '@nestjs/common';
import Permission from './permission.type';

export const Permissions = (...permissions: Permission[]) =>
  SetMetadata('permissions', permissions);
