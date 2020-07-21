import { getRepository, Repository, Not } from 'typeorm';

import User from '../entities/User';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IExceptUserIdDTO from '@modules/users/dtos/IExceptUserIdDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async findAllProviders({
    except_user_id,
  }: IExceptUserIdDTO): Promise<User[]> {
    const users = await this.ormRepository.find({
      where: {
        id: Not(except_user_id),
      },
    });

    return users;
  }

  public async findByID(user_id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(user_id);

    return user;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
