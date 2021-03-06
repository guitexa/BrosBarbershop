import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public async show(req: Request, res: Response): Promise<Response> {
    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({
      user_id: req.user.id,
    });

    return res.json(classToClass(providers));
  }
}
