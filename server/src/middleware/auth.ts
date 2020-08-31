import { Request } from 'express'
import { isLoggedIn } from '../shared/auth';
import { Unauthorized } from '../errors';

export const guest = (req: Request) => {
  if (isLoggedIn(req)) {
    throw new Unauthorized('You are already logged in');
  }
}

export const auth = (req: Request) => {
  if (!isLoggedIn(req)) {
    throw new Unauthorized('You must be logged in');
  }
}
