import { IsEmail, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class SwitchLikeRequest {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  postId: number;
}
