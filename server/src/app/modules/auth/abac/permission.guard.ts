import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import UserClaims from '../../users/claims/user.claim';
import { JwtAuthGuard } from '../auth.guards';
import { RequestWithUser } from '../auth.interface';
import { ClaimsMap } from './auth.roles';
import Permission from './permission.type';

const PermissionGuard = (
  permission: Permission | Permission[],
): Type<CanActivate> => {
  class PermissionGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      // user is available on the request because we extend the JwtAuthGuard
      const { user, params } = context
        .switchToHttp()
        .getRequest<RequestWithUser>();

      // reduce roles to a list of available claims
      const allClaims = user?.roles.reduce<Permission[]>((acc, role) => {
        const claims = acc.concat(ClaimsMap[role]);
        return claims;
      }, []);

      // check if user is an owner of the resource
      const isOwner =
        allClaims.includes(UserClaims.CanImpersonateUser) ||
        user?.id === params?.id;

      // check if user has permission to interact with the resource
      const permissions = Array.isArray(permission) ? permission : [permission];
      const hasPermission =
        isOwner && permissions.every((claim) => allClaims.includes(claim));

      // return resulting boolean
      return hasPermission;
    }
  }

  return mixin(PermissionGuardMixin);
};

export default PermissionGuard;
