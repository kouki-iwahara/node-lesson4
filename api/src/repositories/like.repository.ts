import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Like } from '../entities/like.entity';

@Injectable()
@EntityRepository(Like)
export class LikeRepository extends Repository<Like> {}
