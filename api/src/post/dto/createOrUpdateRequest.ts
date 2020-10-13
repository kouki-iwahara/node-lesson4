import { IsEmail, IsNotEmpty, IsString, IsBoolean, Max } from 'class-validator';

export class CreateOrUpdateRequest {
  id: number;

  @IsNotEmpty()
  title: string;

  @Max(140)
  @IsNotEmpty()
  content: string;

  userId: number;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}
