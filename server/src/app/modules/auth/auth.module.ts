import { Module } from '@nestjs/common';
import AuthService from './auth.service';
import UsersModule from '../users/users.module';
import AuthController from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import {
  JwtStrategy,
  LocalStrategy,
  JwtRefreshTokenStrategy,
} from './passport.strategies';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, PassportModule, ConfigModule, JwtModule.register({})],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
  controllers: [AuthController],
})
export default class AuthModule {}
