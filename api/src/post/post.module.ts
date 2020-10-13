import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from '../repositories/post.repository';
import { LikeRepository } from '../repositories/like.repository';
import { UserRepository } from 'src/repositories/user.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([PostRepository, LikeRepository, UserRepository]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
