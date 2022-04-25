import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { RequestWithUser } from '../auth.interface';

@Injectable()
export class OwnerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // user is available on the request because we use the JwtAuthGuard
    const { user } = context.switchToHttp().getRequest<RequestWithUser>();

    // force an unauthorized error when the user is not the owner of the resource
    return next.handle().pipe(
      tap((responseData) => {
        if (!responseData.ownerId) {
          throw new Error(
            `No owner found while OwnerInterceptor is applied.
            Please either remove the OwnerInterceptor or add an 
            owner relation to the Entity`,
          );
        }
        if (responseData.ownerId !== user?.id) {
          throw new UnauthorizedException();
        }
      }),
    );
  }
}
