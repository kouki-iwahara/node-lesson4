import {
  Body,
  Controller,
  Patch,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { SwitchLikeRequest } from './dto/switchLikeRequest';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Patch()
  async swithLike(@Body(ValidationPipe) param: SwitchLikeRequest) {
    const like = await this.likeService.switchLike(param).catch(err => {
      throw new Error(err);
    });
    return like;
  }
}
