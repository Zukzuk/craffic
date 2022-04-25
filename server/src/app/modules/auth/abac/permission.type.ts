import ItemClaims from '../../books/claims/book.claim';
import UserClaims from '../../users/claims/user.claim';
import SelfClaims from '../../users/claims/self.claim';

const Permission = {
  ...UserClaims,
  ...SelfClaims,
  ...ItemClaims,
};
type Permission = UserClaims | SelfClaims | ItemClaims;

export default Permission;
