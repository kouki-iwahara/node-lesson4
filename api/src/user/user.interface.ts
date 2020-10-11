import { User } from '../entities/user.entity';

export interface IUserService {
  findByEmail(email: UserEmail): Promise<User>;
  findById(id: UserId): Promise<User>;
}

export type UserEmail = {
  email: string;
};

export type UserId = {
  id: number;
};
