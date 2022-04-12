import { Strategy as LocalPassportStrategy } from 'passport-local';
import { Strategy as JwtPassportStrategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AuthService from './auth.service';
import UsersService from '../users/users.service';
import { Request } from 'express';
import { TokenPayload } from './auth.interface';
import { ResponseUserDto } from '../users/dtos/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(LocalPassportStrategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<ResponseUserDto> {
    return this.authService.getAuthenticatedUser(email, password);
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtPassportStrategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate({ userId }: TokenPayload) {
    return this.userService.findOne(userId);
  }
}

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  JwtPassportStrategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
      // needed to access the cookies in the validate method
      passReqToCallback: true,
    });
  }

  async validate(request: Request, { userId }: TokenPayload) {
    const refreshToken = request.cookies?.Refresh;
    return this.userService.getUserIfRefreshTokenMatches(userId, refreshToken);
  }
}
