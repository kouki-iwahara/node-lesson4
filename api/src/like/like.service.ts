import { Injectable } from '@nestjs/common';
import { LikeRepository } from 'src/repositories/like.repository';
import { Like } from 'typeorm';
import { SwitchLikeRequest } from './dto/switchLikeRequest';

@Injectable()
export class LikeService {
  constructor(private likeRepository: LikeRepository) {}

  async switchLike(param: SwitchLikeRequest) {
    const { userId, postId } = param;
    const like = await this.likeRepository
      .createQueryBuilder('like')
      .where('user_id = :userId', { userId })
      .andWhere('post_id = :postId', { postId })
      .getOne();
    like.isLiked = like.isLiked === 0 ? 1 : 0;
    return await this.likeRepository.save(like);
  }
}
