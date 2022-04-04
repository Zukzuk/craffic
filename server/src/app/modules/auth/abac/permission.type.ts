import ItemClaims from '../../books/claims/book.claim';
import UserClaims from '../../users/claims/user.claim';

const Permission = {
  ...UserClaims,
  ...ItemClaims,
};
type Permission = UserClaims | ItemClaims;

export default Permission;
