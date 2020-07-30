import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const keyCache = `list-providers-appointments:${provider_id}:${format(
      appointmentDate,
      'yyyy-M-d',
    )}`;

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
      provider_id,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This date is not available');
    }

    const provider = await this.usersRepository.findByID(provider_id);

    if (!provider) {
      throw new AppError('This provider_id not exists');
    }

    const user = await this.usersRepository.findByID(user_id);

    if (!user) {
      throw new AppError('This user_id not exists');
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You cannot schedule an appointment on the past');
    }

    if (user_id === provider_id) {
      throw new AppError('You cannot schedule an appointment with yourself');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You cannot schedule appointments before 8am and after 5pm',
      );
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const formattedDate = format(appointmentDate, "dd/MM/yyyy 'às' HH'h'");

    await this.notificationsRepository.create({
      recipient_id: provider.id,
      content: `O usuário ${user.name} realizou um agendamento dia ${formattedDate}`,
    });

    await this.cacheProvider.invalidade(keyCache);

    return appointment;
  }
}
