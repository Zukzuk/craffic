import {
  Body,
  Req,
  Controller,
  Post,
  UseGuards,
  Res,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './auth.guards';
import { LogInDto } from './dtos/auth.dto';
import { Response } from 'express';
import { RequestWithUser } from './auth.interface';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { BaseUserDto } from '../users/dtos/users.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: BaseUserDto) {
    return this.authService.register(registrationData);
  }

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LogInDto })
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    // Sending the Set-Cookie header with the generated token directly use the Response object.
    // When the browser receives this response, it sets the cookie so that it can use it later.
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    // Since the cookies that we designed are  HttpOnly, we need to create an endpoint that clears it.
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }
}
