import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import SelfClaims from '../../users/claims/self.claim';
import { RequestWithUser } from '../auth.interface';
import { ClaimsMap } from './auth.roles';
import Permission from './permission.type';

@Injectable()
export default class SelfGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // user is available on the request because we use the JwtAuthGuard
    const { user, params } = context
      .switchToHttp()
      .getRequest<RequestWithUser>();

    // reduce roles to a list of assigned claims
    const assignedClaims = user?.roles.reduce<Permission[]>((acc, role) => {
      const claims = acc.concat(ClaimsMap[role]);
      return claims;
    }, []);

    // check if the requesting user can be identified as 'self'
    const isAdmin = assignedClaims.includes(SelfClaims.CanImpersonateUser);
    const isSelf = isAdmin || params.id === user.id;

    // return resulting boolean
    return isSelf;
  }
}
