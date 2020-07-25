import { Request, Response, NextFunction } from 'express';
import redis from 'redis';
import AppError from '@shared/errors/AppError';
import { RateLimiterRedis } from 'rate-limiter-flexible';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.PORT),
  password: process.env.PASSWORD || undefined,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1,
  inmemoryBlockOnConsumed: 6,
  inmemoryBlockDuration: 60,
});

export default async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    await limiter.consume(req.ip);

    return next();
  } catch {
    throw new AppError('Too many requests', 429);
  }
}
