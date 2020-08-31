import { ConnectionOptions } from 'mongoose';

const {
  MONGO_USERNAME = 'admin',
  MONGO_PASSWORD = 'secret',
  MONGO_HOST = 'mongodb',
  MONGO_PORT = 27017,
  MONGO_DATABASE = 'heni-db'
} = process.env

export const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`

export const MONGO_OPTIONS: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: MONGO_USERNAME,
  pass: MONGO_PASSWORD,
}
