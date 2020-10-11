import { IsEmail, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty()
  @IsEmail({}, { message: 'invalid Email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
