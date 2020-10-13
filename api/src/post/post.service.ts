import { Injectable } from '@nestjs/common';
import { LikeRepository } from 'src/repositories/like.repository';
import { PostRepository } from 'src/repositories/post.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { CreateOrUpdateRequest } from './dto/createOrUpdateRequest';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private likeRepository: LikeRepository,
    private userRepository: UserRepository,
  ) {}

  async getPosts(userId: number) {
    const posts = await this.postRepository.find();
    const likes = await this.likeRepository.find();
    const users = await this.userRepository.find();

    const postsResponse = posts.map((post, index) => {
      const like = likes.find(like => {
        return like.postId === post.id && like.userId === +userId;
      });

      const likeCounts = likes.filter(like => {
        return like.postId === post.id && like.isLiked === 1;
      });
      const userName = users.find(user => user.id === post.userId).name;
      return {
        ...post,
        isLiked: !like ? 0 : like.isLiked,
        userName,
        likeCounts: likeCounts.length,
      };
    });
    return { postsResponse };
  }

  async createOrUpdatePost(param: CreateOrUpdateRequest) {
    // 新規作成
    if (!param.id) {
      const post = await this.postRepository.save(param);
      await this.likeRepository.save({
        userId: post.userId,
        postId: post.id,
        isLiked: 0,
      });
      return await this.getPosts(param.userId);
    }
    // 更新
    return await this.postRepository.save(param);
  }

  async deletePosts(id: number) {
    await this.postRepository.delete({ id });
    await this.likeRepository.delete({ postId: id });
  }
}
