import { Body, Controller, Patch, ValidationPipe } from '@nestjs/common';
import { SwitchLikeRequest } from './dto/switchLikeRequest';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Patch()
  async swithLike(@Body(ValidationPipe) param: SwitchLikeRequest) {
    const like = await this.likeService.switchLike(param).catch(err => {
      throw new Error(err);
    });
    return like;
  }
}
