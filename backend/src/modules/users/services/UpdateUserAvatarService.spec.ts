import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to upload an user avatar', async () => {
    const user = await createUser.execute({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      userID: user.id,
      avatarFilename: 'avatar.png',
    });

    expect(user.avatar).toBe('avatar.png');
  });

  it('should NOT be able to upload an user avatar from an unauthorized user', async () => {
    await createUser.execute({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    await expect(
      updateUserAvatar.execute({
        userID: '4353267457',
        avatarFilename: 'avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete old avatar when try to upload a new one', async () => {
    const user = await createUser.execute({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

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
