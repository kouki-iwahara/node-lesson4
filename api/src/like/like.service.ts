import { Injectable } from '@nestjs/common';
import { Like } from 'src/entities/like.entity';
import { LikeRepository } from 'src/repositories/like.repository';
import { SwitchLikeRequest } from './dto/switchLikeRequest';

@Injectable()
export class LikeService {
  constructor(private likeRepository: LikeRepository) {}

  async switchLike(param: SwitchLikeRequest) {
    const { userId, postId } = param;
    const likes = await this.likeRepository.find();
    const like = likes.find(like => {
      return like.userId === userId && like.postId === postId;
    });
    if (!like) {
      const data = new Like();
      data.userId = userId;
      data.postId = postId;
      data.isLiked = 1;
      return await this.likeRepository.insert(data);
    }
    like.isLiked = like.isLiked === 0 ? 1 : 0;
    const result = await this.likeRepository.save(like);
    return result;
  }
}
