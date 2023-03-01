import { NextFunction, Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { networkInterfaces } from 'os';
import { nextTick } from 'process';
import User, { IUser } from '../models/userModel';
import {
  IChangeUsersRoleBodyParams,
  IChangeUsersStatusParams,
  ICreateUserBodyParams,
  IDeleteUsersBodyParams,
  IGetAllUsersQueryParams,
} from '../types';

export const getUsers = async (
  req: Request<unknown, unknown, unknown, IGetAllUsersQueryParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    let query: FilterQuery<IUser> = {};
    const isBlocked = req.query.isBlocked;
    const sort = req.query.asc ? 'asc' : 'desc';
    const page = req.query.page ?? 1;
    if (isBlocked !== undefined) {
      query.isBlocked = { $e: isBlocked };
    }
    const users = await User.find(query)
      .sort(sort)
      .skip((page - 1) * 20)
      .limit(20)
      .lean();
    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (e: any) {
    next(e);
  }
};

export const createUser = async (
  req: Request<unknown, unknown, ICreateUserBodyParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({
      status: 'success',
      deta: {
        user,
      },
    });
  } catch (e: any) {
    next(e);
  }
};

export const bulkChangeUserStatus = async (
  req: Request<unknown, unknown, IChangeUsersStatusParams>,
  res: Response,
  next: NextFunction,
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const users = req.body.users;
    const isBlock = req.body.isBlock;
    const result = await User.updateMany({ _id: { $in: users } }, { isBlocked: isBlock });
    if (result.acknowledged) {
      return res.status(200).send('success');
    }
    res.status(400);
  } catch (e: any) {
    next(e);
  }
};

export const changeUserRole = async (
  req: Request<{ id: string }, unknown, IChangeUsersRoleBodyParams>,
  res: Response,
  next: NextFunction,
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const role = req.body.role;
    const user = await User.findByIdAndUpdate({ _id: req.params.id }, { role });
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (e: any) {
    next(e);
  }
};

export const bulkDeleteUsers = async (
  req: Request<unknown, unknown, IDeleteUsersBodyParams>,
  res: Response,
  next: NextFunction,
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const users = req.body;
    const result = await User.deleteMany({ _id: { $in: users } });
    if (result.acknowledged) {
      return res.status(204).send('success');
    }
    res.status(400);
  } catch (e: any) {
    next(e);
  }
};

export const getUser = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await User.findById({ _id: req.params.id }).lean();
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (e: any) {
    next(e);
  }
};
