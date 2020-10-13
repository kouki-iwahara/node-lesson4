import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { hashPassword } from 'src/helpers/converter/user';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/auth-login.request';
import { SignUpRequest } from './dto/signupRequest';
import * as jwt_decode from 'jwt-decode';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body(ValidationPipe) param: SignUpRequest) {
    param.password = await hashPassword(param.password, 10);
    const user = await this.authService.signUp(param).catch(err => {
      throw new Error(err);
    });
    return user;
  }

  @Post('login')
  async login(@Body() param: LoginRequest, @Res() res: Response) {
    const data = await this.authService.login(param).catch(err => {
      throw new Error(err);
    });
    res.send(data);
  }

  @Get('/me')
  async test(@Req() req: Request) {
    const token = req.headers['authorization'];
    const decoded: { userId: number } = jwt_decode(token);
    const user = await this.authService.getLoggedInUser(decoded.userId);
    return user;
  }
}
