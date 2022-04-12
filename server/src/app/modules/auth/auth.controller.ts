import {
  Body,
  Req,
  Controller,
  Post,
  UseGuards,
  Get,
  HttpCode,
  Put,
} from '@nestjs/common';
import AuthService from './auth.service';
import { JwtAuthGuard, JwtRefreshGuard, LocalAuthGuard } from './auth.guards';
import { LogInDto } from './dtos/auth.dto';
import { RequestWithUser } from './auth.interface';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, ResponseUserDto } from '../users/dtos/user.dto';
import UsersService from '../users/users.service';

@ApiTags('Authentication')
@Controller('auth')
export default class AuthController {
  // By using the 'private readonly', there is no need to assign the service in the body of the constructor
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(
    @Body() registrationData: CreateUserDto,
  ): Promise<ResponseUserDto> {
    return this.authService.register(registrationData);
  }

  @ApiBody({ type: LogInDto })
  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async logIn(@Req() request: RequestWithUser): Promise<ResponseUserDto> {
    await this.setAuthenticatedCookies(request);
    return new ResponseUserDto(request.user);
  }

  @Put('refresh')
  @UseGuards(JwtRefreshGuard)
  async refresh(@Req() request: RequestWithUser): Promise<ResponseUserDto> {
    console.log(request.user)
    await this.setAuthenticatedCookies(request);
    return new ResponseUserDto(request.user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async authenticate(
    @Req() request: RequestWithUser,
  ): Promise<ResponseUserDto> {
    const { user } = request;
    return new ResponseUserDto(user);
  }

  @Post('logout')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async logOut(@Req() request: RequestWithUser): Promise<string> {
    const { user } = request;
    const cookies = await this.authService.clearAuthForLogout(user.id);
    // Since the cookies are HttpOnly, we need to clear them and send them to the client.
    console.log('empty cookies', cookies);
    request.res.setHeader('Set-Cookie', cookies);
    return 'OK';
  }

  // PRIVATE //

  private async setAuthenticatedCookies(
    request: RequestWithUser,
  ): Promise<void> {
    const { user } = request;
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.id,
    );
    const refreshTokenCookie =
      await this.authService.getCookieWithJwtRefreshToken(user.id);
    /*
    Using @Res() decorator interferes with the ClassSerializerInterceptor 
    that we use to exclude all response data by default.
    Let's use the provided res(ponse) object on the Express request object instead.
    */
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
  }
}
