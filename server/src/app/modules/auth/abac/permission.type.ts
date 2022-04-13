import ItemClaims from '../../books/claims/book.claim';
import UserClaims from '../../users/claims/user.claim';
import OwnerClaims from '../../users/claims/owner.claim';

const Permission = {
  ...UserClaims,
  ...OwnerClaims,
  ...ItemClaims,
};
type Permission = UserClaims | OwnerClaims | ItemClaims;

export default Permission;
