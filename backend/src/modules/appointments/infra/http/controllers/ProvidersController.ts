import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public async show(req: Request, res: Response): Promise<Response> {
    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({
      user_id: req.user.id,
    });

    providers.forEach(provider => delete provider.password);

    return res.json(providers);
  }
}
