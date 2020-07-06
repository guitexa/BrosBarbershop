import { Router } from 'express';
import multer from 'multer';

import CreateUsersController from '../controllers/CreateUsersController';
import UpdateAvatarController from '../controllers/UpdateAvatarController';

import ensureAuth from '../middlewares/ensureAuth';
import uploadConfig from '@config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);
const createUsersController = new CreateUsersController();
const updateAvatarController = new UpdateAvatarController();

usersRouter.post('/', createUsersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuth,
  upload.single('avatar'),
  updateAvatarController.update,
);

export default usersRouter;
