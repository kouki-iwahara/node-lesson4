import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from '../repositories/post.repository';
import { LikeRepository } from '../repositories/like.repository';
@Module({
  imports: [TypeOrmModule.forFeature([PostRepository, LikeRepository])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
