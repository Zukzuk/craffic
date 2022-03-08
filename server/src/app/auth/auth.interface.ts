import { UserEntity } from '../users/users.entity';

// Using Passport local strategy, he data of the user is attached to the request object.
// This is why we extend the Request interface.
export interface RequestWithUser extends Request {
  user: UserEntity;
}

export interface TokenPayload {
  userId: number;
}
