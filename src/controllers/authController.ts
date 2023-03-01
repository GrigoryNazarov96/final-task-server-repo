import { NextFunction, Request, Response, CookieOptions } from 'express';
import User, { IUser } from '../models/userModel';
import { ILoginUserBodyParams, ISignupUserBodyParams } from '../types';
import * as jwt from 'jsonwebtoken';
import ms from 'ms';
import { AppError } from '../error';

const signToken = (id: string, name: string, email: string, role: string): string => {
  return jwt.sign({ id, name, email, role }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSignToken = (user: IUser, statusCode: number, res: Response): void => {
  const token = signToken(user._id.toString(), user.name, user.email, user.role);
  const cookieOptions: CookieOptions = {
    expires: new Date(Date.now() + ms('7d')),
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  };
  res.cookie('jwt', token, cookieOptions);
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const login = async (
  req: Request<unknown, unknown, ILoginUserBodyParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppError('Please provide both email and password', 400);
    }
    const user = await User.findOne({ email }).select('+password');
    const isCorrectPassword = await user?.correctPassword(password, user.password);
    if (!user || !isCorrectPassword) {
      throw new AppError('Incorrect email or password', 401);
    }
    createSignToken(user, 200, res);
  } catch (e: any) {
    next(e);
  }
};

export const signup = async (
  req: Request<unknown, unknown, ISignupUserBodyParams>,
  res: Response,
): Promise<void> => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    createSignToken(user, 201, res);
  } catch (e: any) {
    res.send('User with this email already exists');
  }
};

export const protect =
  (params: { allowNonAuthorized: boolean } = { allowNonAuthorized: false }) =>
  async (
    req: Request,
    res: Response<unknown, { user: IUser; [key: string]: any }>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      let token: string | undefined;
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
      }
      if (!token) {
        if (params.allowNonAuthorized) {
          return next();
        }
        throw new AppError('You are not logged in', 401);
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as jwt.JwtPayload;
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        throw new AppError('The user no longer exists', 404);
      }
      req.user = currentUser;
      res.locals.user = currentUser;
      next();
    } catch (e: any) {
      next(e);
    }
  };

export const restrictTo =
  (role: IUser['role']) =>
  (req: Request, res: Response, next: NextFunction): void | Response => {
    if (req.user?.role !== role) {
      return next(new AppError('You are not permitted to perform this action', 401));
    }
    next();
  };

export const logout = (req: Request, res: Response) => {
  res.cookie('jwt', 'Logged Out', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};
