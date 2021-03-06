import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateAppointmentService from './CreateAppointmentService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeUsersRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20).getTime();
    });

    const provider = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@brosbarbershop.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@brosbarbershop.com',
      password: '123456',
    });

    const appointment = await createAppointment.execute({
      provider_id: provider.id,
      user_id: user.id,
      date: new Date(2020, 4, 21, 10),
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should NOT be able to create a new appointment on the same date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20).getTime();
    });

    const provider = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@brosbarbershop.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@brosbarbershop.com',
      password: '123456',
    });

    await createAppointment.execute({
      provider_id: provider.id,
      user_id: user.id,
      date: new Date(2020, 4, 21, 10),
    });

    await expect(
      createAppointment.execute({
        provider_id: provider.id,
        user_id: user.id,
        date: new Date(2020, 4, 21, 10),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create a new appointment for an inexistent provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20).getTime();
    });

    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@brosbarbershop.com',
      password: '123456',
    });

    await expect(
      createAppointment.execute({
        provider_id: 'inexistent-provider',
        user_id: user.id,
        date: new Date(2020, 4, 21, 10),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create a new appointment for an inexistent user', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20).getTime();
    });

    const provider = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@brosbarbershop.com',
      password: '123456',
    });

    await expect(
      createAppointment.execute({
        provider_id: provider.id,
        user_id: 'inexistent-user',
        date: new Date(2020, 4, 21, 10),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create an appointment on past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20).getTime();
    });

    const provider = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@brosbarbershop.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@brosbarbershop.com',
      password: '123456',
    });

    await expect(
      createAppointment.execute({
        provider_id: provider.id,
        user_id: user.id,
        date: new Date(2020, 4, 19, 10),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create a new appointment on the same user', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20).getTime();
    });

    const provider = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@brosbarbershop.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@brosbarbershop.com',
      password: '123456',
    });

    await expect(
      createAppointment.execute({
        provider_id: provider.id,
        user_id: provider.id,
        date: new Date(2020, 4, 21, 10),
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        provider_id: user.id,
        user_id: user.id,
        date: new Date(2020, 4, 21, 10),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create a new appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20).getTime();
    });

    const provider = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@brosbarbershop.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@brosbarbershop.com',
      password: '123456',
    });

    await expect(
      createAppointment.execute({
        provider_id: provider.id,
        user_id: user.id,
        date: new Date(2020, 4, 21, 7),
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        provider_id: provider.id,
        user_id: user.id,
        date: new Date(2020, 4, 21, 18),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
