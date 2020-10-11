import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';

export const toOmitPasswordUser = (user: User): Omit<User, 'password'> => {
  const { password, ...convertedUser } = user;
  return convertedUser;
};

export const hashPassword = (
  password: string,
  salt: number,
): Promise<string> => {
  return bcrypt.hash(password, salt);
};
