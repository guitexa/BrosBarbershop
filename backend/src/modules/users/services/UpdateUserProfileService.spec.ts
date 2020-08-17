import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import UpdateUserProfileService from './UpdateUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let updateUserProfile: UpdateUserProfileService;

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    updateUserProfile = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to update user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    await updateUserProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@mail.com',
    });

    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('johndoe@mail.com');
  });

  it('should NOT be able to update profile from inexistent user', async () => {
    await expect(
      updateUserProfile.execute({
        user_id: 'wrong-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    await updateUserProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@mail.com',
      old_password: '123456',
      password: 'new-password',
    });

    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('johndoe@mail.com');
    expect(user.password).toBe('new-password');

    await updateUserProfile.execute({
      user_id: user.id,
      old_password: 'new-password',
      password: 'another-new-password',
    });

    expect(user.password).toBe('another-new-password');
  });

  it('should NOT be able to update password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        password: 'new-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to update password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        old_password: 'wrong-old-password',
        password: 'new-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to update email to another in use', async () => {
    await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        email: 'janedoe@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
