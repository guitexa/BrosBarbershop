import { Router } from 'express';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';

import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providers = new ProvidersController();

providersRouter.use(ensureAuth);

providersRouter.get('/', providers.show);

export default providersRouter;
