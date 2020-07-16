import { Router } from 'express';
import multer from 'multer';

import CreateUsersController from '../controllers/CreateUsersController';
import UpdateAvatarController from '../controllers/UpdateAvatarController';

import ensureAuth from '../middlewares/ensureAuth';
import uploadConfig from '@config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);
const createUsers = new CreateUsersController();
const updateAvatar = new UpdateAvatarController();

usersRouter.post('/', createUsers.create);

usersRouter.patch(
  '/avatar',
  ensureAuth,
  upload.single('avatar'),
  updateAvatar.update,
);

export default usersRouter;
