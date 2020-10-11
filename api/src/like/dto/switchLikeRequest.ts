import { IsEmail, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class SwitchLikeRequest {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  postId: string;
}
