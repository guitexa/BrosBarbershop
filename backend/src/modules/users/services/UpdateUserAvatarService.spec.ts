import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to upload an user avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    await updateUserAvatar.execute({
      userID: user.id,
      avatarFilename: 'avatar.png',
    });

    expect(user.avatar).toBe('avatar.png');
  });

  it('should NOT be able to upload an user avatar from an unauthorized user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    expect(
      updateUserAvatar.execute({
        userID: '4353267457',
        avatarFilename: 'avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete old avatar when try to upload a new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    await updateUserAvatar.execute({
      userID: user.id,
      avatarFilename: 'avatar.png',
    });

    await updateUserAvatar.execute({
      userID: user.id,
      avatarFilename: 'new-avatar.png',
    });

    expect(user.avatar).toBe('new-avatar.png');
  });
});
