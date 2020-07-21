import User from '../infra/typeorm/entities/User';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IExceptUserIdDTO from '../dtos/IExceptUserIdDTO';

export default interface IUsersRepository {
  findAllProviders(data: IExceptUserIdDTO): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findByID(user_id: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
