import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Jane Trê',
      email: 'janetre@mail.com',
      password: '123456',
    });

    const user3 = await fakeUsersRepository.create({
      name: 'Jane Qua',
      email: 'janequa@mail.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: user1.id,
    });

    expect(providers).toEqual([user2, user3]);
  });
});
