import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessions = new SessionsController();

sessionsRouter.post('/', sessions.create);

export default sessionsRouter;
