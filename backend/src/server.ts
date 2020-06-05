import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';

import uploadConfig from './config/upload';
import './database';
import AppError from './errors/AppError';

const port = 4356;
const app = express();

app.use(express.json());
app.use(routes);
app.use('/files', express.static(uploadConfig.directory));

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(port, () => {
  console.log(`SERVER ON http://localhost:${port}`);
});
