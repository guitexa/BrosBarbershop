import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset user password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPassword.execute({
      password: 'new-password',
      token,
    });

    expect(user.password).toBe('new-password');
  });

  it('should NOT be able to reset user password with an invalid token', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'inexistent-user',
    );

    await expect(
      resetPassword.execute({
        password: 'new-password',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to reset user password with an inexistent user', async () => {
    await expect(
      resetPassword.execute({
        password: 'new-password',
        token: 'invalid-token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to reset user password with more than one hour from created token', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 2);
    });

    await expect(
      resetPassword.execute({
        password: 'new-password',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
