import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import OwnerClaims from '../../users/claims/owner.claim';
import { RequestWithUser } from '../auth.interface';
import { ClaimsMap } from './auth.roles';
import Permission from './permission.type';

@Injectable()
export default class OwnerGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // user is available on the request because we extend the JwtAuthGuard
    const { user, params } = context
      .switchToHttp()
      .getRequest<RequestWithUser>();

    // reduce roles to a list of assigned claims
    const assignedClaims = user?.roles.reduce<Permission[]>((acc, role) => {
      const claims = acc.concat(ClaimsMap[role]);
      return claims;
    }, []);

    // check if user is the owner of the resource
    const isOwner =
      assignedClaims.some(
        (claim) => claim === OwnerClaims.CanImpersonateUser,
      ) || user.id === params.id;

    // return resulting boolean
    return isOwner;
  }
}
