import { Request } from 'express';
import UserEntity from '../users/entities/user.entity';

/*
By using Passport strategies, we have access to the user through the request object.
This is why we need extend the Request interface with the user entity.
*/
export interface RequestWithUser extends Request {
  user: UserEntity;
}

export interface TokenPayload {
  userId: string;
}
