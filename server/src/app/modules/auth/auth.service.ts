import UsersService from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import PostgresErrorCode from '../../../database/enums/postgresErrorCode.enum';
import { TokenPayload } from './auth.interface';
import { CreateUserDto, ResponseUserDto } from '../users/dtos/user.dto';

/*
Authentication means checking the identity of user. It provides an 
answer to a question: who is the user?
Authorization is about access to resources. It answers the question: 
is user authorized to perform this operation?
*/
@Injectable()
export default class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(
    registrationData: CreateUserDto,
  ): Promise<ResponseUserDto> {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      // Need to await for correct error catching, can't return immediately
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        /*
        We should implement rate-limiting preventing attackers from brute-forcing 
        our API in order to get a list of registered emails
        */
        throw new BadRequestException();
      }
      throw new InternalServerErrorException();
    }
  }

  public async getAuthenticatedUser(
    email: string,
    plainTextPassword: string,
  ): Promise<ResponseUserDto> {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return new ResponseUserDto(user);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<void> {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new BadRequestException();
    }
  }

  public getCookieWithJwtAccessToken(userId: string): string {
    const payload: TokenPayload = { userId };
    const expiresIn = this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    );
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${expiresIn}s`,
    });

    return `Authentication=${accessToken}; HttpOnly; Path=/; Max-Age=${expiresIn}`;
  }

  public async getCookieWithJwtRefreshToken(userId: string): Promise<string> {
    const payload: TokenPayload = { userId };
    const expiresIn = this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    );
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${expiresIn}s`,
    });
    const isSaved = await this.usersService.setRefreshToken(
      userId,
      refreshToken,
    );

    return isSaved
      ? `Refresh=${refreshToken}; HttpOnly; Path=/auth; Max-Age=${expiresIn}`
      : 'Refresh=; HttpOnly; Path=/auth; Max-Age=0';
  }

  public async clearAuthForLogout(userId: string): Promise<string[]> {
    await this.usersService.nullifyRefreshToken(userId);
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/auth; Max-Age=0',
    ];
  }
}
