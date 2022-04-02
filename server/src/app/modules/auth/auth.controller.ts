import {
  Body,
  Req,
  Controller,
  Post,
  UseGuards,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './auth.guards';
import { LogInDto } from './dtos/auth.dto';
import { RequestWithUser } from './auth.interface';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dtos/user.dto';

@ApiTags('Authentication')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  // By using the 'private readonly', there is no need to assign the service in the body of the constructor
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: CreateUserDto) {
    return this.authService.register(registrationData);
  }

  @ApiBody({ type: LogInDto })
  @Post('log-in')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    /*
    Using @Res() decorator interferes with the ClassSerializerInterceptor that we need 
    to exclude the password from the response.
    Let's use the provided res(ponse) object on the Express request object instead.
    */
    request.res.setHeader('Set-Cookie', cookie);
    return user;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async authenticate(@Req() request: RequestWithUser) {
    const { user } = request;
    return user;
  }

  @Post('log-out')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async logOut(@Req() request: RequestWithUser) {
    // Since the cookies are HttpOnly, we need to clear it and send it to the client.
    const cookie = this.authService.getCookieClearedForLogOut();
    request.res.setHeader('Set-Cookie', cookie);
    return 'OK';
  }
}
