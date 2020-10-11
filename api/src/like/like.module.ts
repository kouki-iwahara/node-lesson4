import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeRepository } from 'src/repositories/like.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LikeRepository])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
