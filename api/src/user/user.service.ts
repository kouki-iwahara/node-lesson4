import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserEmail, UserId } from './user.interface';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findByEmail(param: UserEmail): Promise<User> {
    const user = await this.userRepository.findOne(param);
    return user;
  }

  async findById(id: UserId): Promise<User> {
    const user = await this.userRepository.findOne(id);
    return user;
  }
}
