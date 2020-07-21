import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      provider_id: '2345346',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should NOT be able to create a new appointment on the same date', async () => {
    await createAppointment.execute({
      provider_id: '2345346',
      date: new Date(),
    });

    await expect(
      createAppointment.execute({
        provider_id: '2345346',
        date: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});