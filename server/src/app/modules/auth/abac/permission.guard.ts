import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RequestWithUser } from '../auth.interface';
import { ClaimsMap } from './auth.roles';
import Permission from './permission.type';
import { Reflector } from '@nestjs/core';

@Injectable()
export default class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // grab all needed permissions from the @Permissions decorator
    const permissions = this.reflector.get<Permission[]>(
      'permissions',
      context.getHandler(),
    );
    if (!permissions?.length) {
      throw new Error(
        `No permissions found while PermissionGuard is applied.
        Please either remove the PermissionGuard or add claims 
        through the @Permissions decorator.`,
      );
    }

    // user is available on the request because we extend the JwtAuthGuard
    const { user } = context.switchToHttp().getRequest<RequestWithUser>();

    // reduce roles to a list of assigned claims
    const assignedClaims = user?.roles.reduce<Permission[]>((acc, role) => {
      const claims = acc.concat(ClaimsMap[role]);
      return claims;
    }, []);

    // check if user has permission to interact with the resource
    const hasPermission = permissions.every((claim) =>
      assignedClaims.includes(claim),
    );

    // return resulting boolean
    return hasPermission;
  }
}
