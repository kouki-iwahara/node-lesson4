import { Injectable } from '@nestjs/common';
import { LikeRepository } from 'src/repositories/like.repository';
import { PostRepository } from 'src/repositories/post.repository';
import { CreateOrUpdateRequest } from './dto/createOrUpdateRequest';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private likeRepository: LikeRepository,
  ) {}

  async getPosts(userId: number) {
    const posts = await this.postRepository.find();
    const likes = await this.likeRepository.find({
      where: {
        userId,
      },
    });

    const postsResponse = posts.map((post, index) => {
      const like = likes.find(like => like.postId === post.id);
      return { ...post, isLiked: !like ? 0 : like.isLiked };
    });
    return { postsResponse };
  }

  async createOrUpdatePost(param: CreateOrUpdateRequest) {
    // 新規作成
    if (!param.id) {
      const post = await this.postRepository.save(param);
      const like = await this.likeRepository.save({
        userId: post.userId,
        postId: post.id,
        isLiked: 0,
      });
      console.log(like);
      return { ...post, isLiked: like.isLiked };
    }
    // 更新
    const post = await this.postRepository.save(param);
    const like = await this.likeRepository.findOne({ postId: post.id });
    return { ...post, isLiked: like.isLiked };
  }

  async deletePosts(id: number) {
    const result = await this.postRepository.delete({ id });
    return result;
  }
}
