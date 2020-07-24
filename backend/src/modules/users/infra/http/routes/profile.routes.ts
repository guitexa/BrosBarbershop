import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileUserController from '../controllers/ProfileUserController';
import ensureAuth from '../middlewares/ensureAuth';

const profileRouter = Router();
const profileUser = new ProfileUserController();

profileRouter.use(ensureAuth);

profileRouter.get('/', profileUser.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      old_password: Joi.string(),
      password: Joi.string().min(6),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileUser.update,
);

export default profileRouter;
