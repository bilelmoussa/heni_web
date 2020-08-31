import { PORT, REDIS_OPTIONS, MONGO_URI, MONGO_OPTIONS, } from './config';
import mongoose from 'mongoose'
import createApp from './app';
import { Logger } from './shared/logger';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import session from 'express-session';

(async () => {
  try {
    await mongoose.connect(MONGO_URI, MONGO_OPTIONS)

    const RedisStore = connectRedis(session);

    const client = new Redis(REDIS_OPTIONS);

    const store = new RedisStore({ client });

    const { server } = createApp(store);
    
    server.listen(PORT, () => {
      Logger.info(`Server Started on Port : ${PORT}`);
    });
  } catch (err) {
    Logger.error(err);
  }
})();
