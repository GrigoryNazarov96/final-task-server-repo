import { NextFunction, Request, Response } from 'express';
import { AppError } from '../error';
import Review from '../models/reviewModel';
import { IReviewBodyParams, IReviewQueryParams } from '../types';

export const getReviewsPerItem = async (
  req: Request<unknown, unknown, unknown, IReviewQueryParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const item = req.query.item;
    const reviews = await Review.find({ item }).lean();
    res.status(200).json({
      status: 'success',
      data: {
        reviews,
      },
    });
  } catch (e: any) {
    next(e);
  }
};

export const createReviewForItem = async (
  req: Request<unknown, unknown, IReviewBodyParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const item = req.body.item;
    const author = req.body.author;
    if (!author) {
      throw new AppError('Only authenticated users can write reviews', 401);
    }
    const review = await Review.create({ ...req.body, item, author });
    res.status(200).json({
      status: 'success',
      data: {
        review,
      },
    });
  } catch (e: any) {
    next(e);
  }
};

export const getOneReviewPerItem = async (
  req: Request<{ id: string }, unknown, unknown, IReviewQueryParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const item = req.query.item;
    const review = await Review.findOne({ item, _id: req.params.id }).lean();
    res.status(200).json({
      status: 'success',
      data: {
        review,
      },
    });
  } catch (e: any) {
    next(e);
  }
};

export const deleteReviewForItem = async (
  req: Request<{ id: string }, unknown, IReviewBodyParams>,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  try {
    const item = req.body.item;
    const candidate = req.user;
    const isAuthor = candidate?._id.toString() === req.body.author.toString();
    // const review = await Review.findOne({ item, _id: req.params.id }).lean();
    // console.log(review?.author);
    // if (candidate?._id.toString() === review?.author?.toString() || candidate?.role === 'admin') {
    //   await Review.deleteOne({ review });
    //   return res.status(204).json({
    //     status: 'success',
    //   });
    // } else {
    //   throw new AppError('You can not delete the review that does not belong to you', 400);
    // }
    if (candidate?.role === 'admin' || isAuthor) {
      await Review.deleteOne({ item, author: req.body.author });
    } else {
      throw new AppError('You can not perform this action', 401);
    }
  } catch (e: any) {
    next(e);
  }
};
