import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      provider_id: '2345346',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should NOT be able to create a new appointment on the same date', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    await createAppointment.execute({
      provider_id: '2345346',
      date: new Date(),
    });

    expect(
      createAppointment.execute({
        provider_id: '2345346',
        date: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
