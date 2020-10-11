import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { hashPassword } from 'src/helpers/converter/user';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/auth-login.request';
import { SignUpRequest } from './dto/signupRequest';
import { JwtAuthGuard } from './jwt-auth.guards';
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
  async login(
    @Body(ValidationPipe) param: LoginRequest,
    @Res() res: Response,
  ): Promise<void> {
    await this.authService
      .login(param)
      .then(response => {
        const { user, accessToken } = response;
        res.setHeader('Set-Cookie', accessToken);
        res.send(user);
      })
      .catch(err => {
        throw new Error(err);
      });
  }
  /**
   * JwtAuthGuardのテスト用
   */
  // @UseGuards(JwtAuthGuard)
  @Get()
  authTest() {
    return 'sssssssssssssssss';
  }
}
