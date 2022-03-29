import {
  Body,
  Req,
  Controller,
  Post,
  UseGuards,
  Res,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './auth.guards';
import { LogInDto, RegistrationDto } from './dtos/auth.dto';
import { Response } from 'express';
import { RequestWithUser } from './auth.interface';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  // By using the 'private readonly', there is no need to assign the service in the body of the constructor
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: RegistrationDto) {
    return this.authService.register(registrationData);
  }

  @Post('log-in')
  @HttpCode(200)
  @ApiBody({ type: LogInDto })
  @UseGuards(LocalAuthGuard)
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    // Using @Res() decorator interferes with the ClassSerializerInterceptor that we need to exclude the password from the response.
    // Let's use the provided res(ponse) object on the Express request object instead.
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
    const { user } = request;
    // Since the cookies that we designed are HttpOnly, we need to create an endpoint that clears it.
    const cookie = this.authService.getCookieClearedForLogOut();
    request.res.setHeader('Set-Cookie', cookie);
    return 'OK';
  }
}
