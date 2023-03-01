import { Request, Response } from 'express';
import Like from '../models/likeModel';
import { ILikeQueryParams, ILikeBodyParams } from '../types';

export const getLikesCountPerItem = async (
  req: Request<unknown, unknown, unknown, ILikeQueryParams>,
  res: Response,
): Promise<void> => {
  try {
    const item = req.query.item;
    const likesCount = await Like.find({ item }).count();
    res.status(200).json({
      status: 'success',
      data: {
        likesCount,
      },
    });
  } catch (e: any) {
    res.send(e.message);
  }
};

export const createLikeForItem = async (
  req: Request<unknown, unknown, ILikeBodyParams>,
  res: Response,
): Promise<void> => {
  try {
    const item = req.body.item;
    const from = req.body.from;
    await Like.create({ item, from });
    res.status(201).send('success');
  } catch (e: any) {
    res.send(e.message);
  }
};

export const removeLikeForItem = async (
  req: Request<unknown, unknown, ILikeBodyParams>,
  res: Response,
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const item = req.body.item;
    const from = req.body.from;
    await Like.findOneAndDelete({ item, from });
    res.status(204).send('success');
  } catch (e: any) {
    res.send(e.message);
  }
};
