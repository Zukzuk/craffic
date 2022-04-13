import UserClaims from '../../users/claims/user.claim';
import BookClaims from '../../books/claims/book.claim';
import OwnerClaims from '../../users/claims/owner.claim';

export enum ROLES {
  WEBCLIENT_USER = 'WEBCLIENT_USER',
  SERVER_ADMIN = 'SERVER_ADMIN',
}

export const ClaimsMap = {
  [ROLES.WEBCLIENT_USER]: [
    UserClaims.CanReadUser,
    UserClaims.CanUpdateUser,
    UserClaims.CanDeleteUser,
    ...Object.values(BookClaims),
  ],
  [ROLES.SERVER_ADMIN]: [
    ...Object.values(OwnerClaims),
    ...Object.values(UserClaims),
    ...Object.values(BookClaims),
  ],
};
