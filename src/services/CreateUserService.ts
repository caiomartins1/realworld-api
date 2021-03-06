import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import { hash } from 'bcryptjs';
import { AuthenticateUserService } from './AuthenticateUserService';

type CreateUserRequest = {
  username: string;
  email: string;
  password: string;
};

export class CreateUserService {
  async execute({ username, email, password }: CreateUserRequest) {
    if (!username || !email || !password) {
      //TODO: Rethink error handling
      throw new Error('Missing required camps!');
    }

    const usersRepository = getCustomRepository(UsersRepository);
    const authenticateUserService = new AuthenticateUserService();
    const usernameAlreadyExists = await usersRepository.find({ username });
    const emailAlreadyExists = await usersRepository.find({ email });

    if (usernameAlreadyExists.length > 0) {
      throw new Error('Username already exists');
    }

    if (emailAlreadyExists.length > 0) {
      throw new Error('Email already exists');
    }

    const password_hash = await hash(password, 8);

    const createdUser = usersRepository.create({
      username,
      email,
      password_hash,
    });

    await usersRepository.save(createdUser);

    //TODO: rethink response modeling
    const authUserRes = await authenticateUserService.execute({
      email: createdUser.email,
      password,
    });

    //TODO: Add bio and image to database schema
    return {
      user: {
        email,
        token: authUserRes.user.token,
        username,
        bio: '',
        image: '',
      },
    };
  }
}
