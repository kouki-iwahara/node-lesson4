import { Injectable, UnauthorizedException } from '@nestjs/common';
import { throwError } from 'rxjs';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { LoginRequest } from './dto/auth-login.request';
import { User } from '../entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { TJwtPayload } from './type/jwt-payload.type';
import { JwtService } from '@nestjs/jwt';
import { toOmitPasswordUser } from '../helpers/converter/user';
import { TLoginResponse } from './type/login-response.type';
import { SignUpRequest } from './dto/signupRequest';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(param: SignUpRequest): Promise<User> {
    const user = this.userRepository.save(param);
    return user;
  }

  async login(param: LoginRequest): Promise<TLoginResponse> {
    const { email, password } = param;
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = this.createToken(user.id);
    return {
      user: toOmitPasswordUser(user),
      accessToken,
    };
  }

  private async validateUser(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({ email }).catch(err => {
      throwError(err);
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return null;
    }
    return user;
  }

  private createToken(userId: number): string {
    const jwtPayload: TJwtPayload = { userId };
    const token = this.jwtService.sign(jwtPayload, {
      expiresIn: this.getJwtExpTime(),
    });
    return token;
  }

  private getJwtExpTime(): string {
    return `${this.configService.get('JWT_EXPIRATION_TIME')}day`;
  }

  async getLoggedInUser(userId: number) {
    const user = this.userRepository.findOne({ id: userId }).catch(err => {
      throw new Error(err);
    });
    return user;
  }
}
