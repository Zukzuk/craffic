import { Module } from '@nestjs/common';
import AuthService from './auth.service';
import UsersModule from '../users/users.module';
import AuthController from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, LocalStrategy } from './passport.strategies';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export default class AuthModule {}
