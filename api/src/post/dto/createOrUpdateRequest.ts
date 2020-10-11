import { IsEmail, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateOrUpdateRequest {
  id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  userId: number;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}
