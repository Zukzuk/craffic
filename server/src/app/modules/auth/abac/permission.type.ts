import ItemClaims from '../../items/claims/item.claim';
import UserClaims from '../../users/claims/user.claim';

const Permission = {
  ...UserClaims,
  ...ItemClaims,
};
type Permission = UserClaims | ItemClaims;

export default Permission;
