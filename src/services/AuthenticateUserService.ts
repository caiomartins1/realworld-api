import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import { sign } from 'jsonwebtoken';

type AuthenticateRequest = {
  email: string;
  password: string;
};

export class AuthenticateUserService {
  async execute({ email, password }: AuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!email || !password) {
      throw new Error('Missing required camps!');
    }

    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = sign(
      {
        email: user.email,
        id: user.id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1d',
      }
    );

    return {
      user: {
        email: user.email,
        token,
        username: user.username,
        bio: '',
        image: '',
      },
    };
  }
}
