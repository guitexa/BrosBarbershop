import { injectable, inject } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
  password: string;
  token: string;
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ password, token }: Request): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token invalid', 401);
    }
    const user = await this.usersRepository.findByID(userToken.user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const createdToken = userToken.created_at;
    const addHoursToken = addHours(createdToken, 1);

    if (isAfter(Date.now(), addHoursToken)) {
      throw new AppError('Token expired', 401);
    }

    user.password = await this.hashProvider.generateHash(password);

    this.usersRepository.save(user);
  }
}
