import { Router } from 'express';

import ProfileUserController from '../controllers/ProfileUserController';
import ensureAuth from '../middlewares/ensureAuth';

const profileRouter = Router();
const profileUser = new ProfileUserController();

profileRouter.use(ensureAuth);

profileRouter.get('/', profileUser.show);
profileRouter.put('/', profileUser.update);

export default profileRouter;
