import UserClaims from '../../users/claims/user.claim';
import BookClaims from '../../books/claims/book.claim';

export enum ROLES {
  WEBCLIENT_USER = 'WEBCLIENT_USER',
  SERVER_ADMIN = 'SERVER_ADMIN',
}

export const ClaimsMap = {
  [ROLES.WEBCLIENT_USER]: [
    UserClaims.CanReadUser,
    UserClaims.CanUpdateUser,
    BookClaims.CanReadBook,
    BookClaims.CanUpdateBook,
  ],
  [ROLES.SERVER_ADMIN]: [
    ...Object.values(UserClaims),
    ...Object.values(BookClaims),
  ],
};
