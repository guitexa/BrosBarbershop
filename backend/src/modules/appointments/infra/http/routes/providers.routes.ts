import { Router } from 'express';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';

import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();
const providers = new ProvidersController();
const providerMonthAvailability = new ProviderMonthAvailabilityController();
const providerDayAvailability = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuth);

providersRouter.get('/', providers.show);
providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailability.show,
);
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailability.show,
);

export default providersRouter;