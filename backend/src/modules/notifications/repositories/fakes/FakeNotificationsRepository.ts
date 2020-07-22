import { ObjectID } from 'mongodb';

import Notification from '../../infra/typeorm/schemas/Notification';

import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

export default class FakeNotificationsRepository
  implements INotificationRepository {
  private notificationsRepository: Notification[] = [];

  public async create({
    recipient_id,
    content,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), recipient_id, content });

    this.notificationsRepository.push(notification);

    return notification;
  }
}
