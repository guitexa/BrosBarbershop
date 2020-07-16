import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import ForgotPasswordService from './ForgotPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let forgotPassword: ForgotPasswordService;

describe('ForgotPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeMailProvider = new FakeMailProvider();
    forgotPassword = new ForgotPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeMailProvider,
    );
  });

  it('should be able to send email when forgot password', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    await forgotPassword.execute({
      email: user.email,
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should NOT be able to send email when forgot password for an inexistent user', async () => {
    await expect(
      forgotPassword.execute({
        email: 'inexistent-user-email',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to send email when forgot password and generate a user token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    await forgotPassword.execute({
      email: user.email,
    });

    expect(generateToken).toBeCalledWith(user.id);
  });
});
