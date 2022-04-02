import UserClaims from '../../users/claims/user.claim';

export enum ROLES {
  WEBCLIENT_USER = 'WEBCLIENT_USER',
  SERVER_ADMIN = 'SERVER_ADMIN',
}

export const ClaimsMapper = {
  [ROLES.WEBCLIENT_USER]: [UserClaims.CanReadUser, UserClaims.CanUpdateUser],
  [ROLES.SERVER_ADMIN]: [...Object.values(UserClaims)],
};
