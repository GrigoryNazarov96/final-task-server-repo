import { NextFunction, Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { AppError } from '../error';
import Item, { IItem } from '../models/itemModel';
import Like from '../models/likeModel';
import {
  IBulkDeleteBodyParams,
  IGetAllItemsQueryParams,
  IGetItemBodyParams,
  IUpdateItemBodyParams,
} from '../types';

export const getItems = async (
  req: Request<unknown, unknown, unknown, IGetAllItemsQueryParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    throw new AppError('error in get items', 404);
    let query: FilterQuery<IItem> = req.query;
    const tags = req.query.tags;
    if (tags) {
      query.tags = { $in: tags };
    }
    const sort = req.query.asc ? 'asc' : 'desc';
    const page = req.query.page ?? 1;
    const items = await Item.find(query)
      .sort()
      .skip((page - 1) * 20)
      .limit(20)
      .populate(['owner', 'collectionId', 'likes'])
      .select('-__v -id');
    if (!items) {
      throw new AppError('No items found', 404);
    }
    res.status(200).json({
      status: 'success',
      data: {
        items,
      },
    });
  } catch (e: any) {
    next(e);
  }
};

export const getItem = async (
  req: Request<{ id: string }, unknown, IGetItemBodyParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const item = await Item.findById(req.params.id)
      .populate(['owner', 'collectionId', 'likes', { path: 'reviews', populate: 'author' }])
      .lean();
    if (!item) {
      throw new AppError('No item found', 404);
    }
    item.isLiked = !!(await Like.exists({ from: req.user?._id, item: item._id }));
    res.status(200).json({
      status: 'success',
      data: {
        item,
      },
    });
  } catch (e: any) {
    next(e);
  }
};

export const createItem = async (
  req: Request<unknown, unknown, IItem>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const ownerId = req.user?._id;
    const collectionId = req.body.collectionId;
    const item = await Item.create({ ...req.body, owner: ownerId, collectionId });
    res.status(201).json({
      status: 'success',
      data: {
        item,
      },
    });
  } catch (e: any) {
    next(e);
  }
};

export const bulkDeleteItems = async (
  req: Request<unknown, unknown, IBulkDeleteBodyParams>,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  try {
    const items = req.body.items;
    const ownerId = req.user?._id;
    const isAdmin = req.user?.role === 'admin';
    let result;
    if (isAdmin) {
      result = await Item.deleteMany({ _id: { $in: items } });
    }
    result = await Item.deleteMany({ _id: { $in: items }, owner: { $e: ownerId } });
    if (result.acknowledged) {
      return res.status(204).send('success');
    }
    res.status(400).send('Error');
  } catch (e: any) {
    next(e);
  }
};

export const updateItem = async (
  req: Request<{ id: string }, unknown, IUpdateItemBodyParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const item = await Item.updateOne(
      { _id: req.params.id },
      {
        name: req.body.name,
        description: req.body.description,
        optionalFields: req.body.optionalFields,
        tags: req.body.tags,
      },
    );
    res.status(200).json({
      status: 'success',
      data: {
        item,
      },
    });
  } catch (e: any) {
    next(e);
  }
};
