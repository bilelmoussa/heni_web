
import { Request, Response } from 'express';
import { SESSION_NAME } from '../config';

type fullNameType = {
  firstName: string,
  lastName: string,
};

export const isLoggedIn = (req: Request) => !!req.session!.userId;

export const logIn = (req: Request, userId: string, email: string, fullName: fullNameType) => {
  req.session!.userId = userId;
  req.session!.email = email;
  req.session!.fullName = fullName;
  req.session!.createdAt = Date.now();
}

export const logOut = (req: Request, res: Response) =>
  new Promise((resolve, reject) => {
    req.session!.destroy((err: Error) => {
      if (err) reject(err);

      res.clearCookie(SESSION_NAME);

      resolve();
    });
})