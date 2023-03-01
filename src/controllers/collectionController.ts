import { NextFunction, Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { AppError } from '../error';
import Collection, { ICollection } from '../models/collectionModel';
import { IGetCollectionsQueryParams, IUpdateCollectionBodyParams } from '../types';

export const getCollections = async (
  req: Request<unknown, unknown, unknown, IGetCollectionsQueryParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    let query: FilterQuery<ICollection> = req.query;
    const sort = req.query.asc ? 'asc' : 'desc';
    const page = req.query.page ?? 1;
    const collections = await Collection.find(query)
      .sort(sort)
      .skip((page - 1) * 20)
      .limit(20)
      .lean()
      .populate('owner');
    if (!collections) {
      throw new AppError('No collections found', 404);
    }
    res.status(200).json({
      status: 'success',
      data: {
        collections,
      },
    });
  } catch (e: any) {
    next(e);
  }
};

export const createCollection = async (
  req: Request<unknown, unknown, IUpdateCollectionBodyParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    let owner = req.user?._id;
    if (req.user?.role === 'admin' && req.body.owner) {
      owner = req.body.owner;
    }
    const body = req.body;
    const collection = await Collection.create({ ...body, owner });
    res.status(201).json({
      status: 'success',
      data: {
        collection,
      },
    });
  } catch (e: any) {
    next(e);
  }
};

export const getCollection = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const collection = await Collection.findById({ _id: req.params.id }).populate('owner').lean();
    if (!collection) {
      throw new AppError('No collection found', 404);
    }
    res.status(200).json({
      status: 'success',
      data: {
        collection,
      },
    });
  } catch (e: any) {
    next(e);
  }
};

export const updateCollection = async (
  req: Request<{ id: string }, unknown, IUpdateCollectionBodyParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const collection = await Collection.updateOne(
      { _id: req.params.id },
      {
        name: req.body.name,
        description: req.body.description,
        theme: req.body.theme,
        optionalFields: req.body.optionalFields,
        updatedAt: Date.now(),
      },
    );
    res.status(200).json({
      status: 'success',
      data: {
        collection,
      },
    });
  } catch (e: any) {
    next(e);
  }
};

export const deleteCollection = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  try {
    const candidate = req.user;
    const collection = await Collection.findById({ _id: req.params.id });
    if (candidate?._id.toString() === collection?.owner.toString() || req.user?.role === 'admin') {
      await Collection.deleteOne({ collection });
      return res.status(204).send('success');
    } else {
      throw new AppError('You can not delete collection that does not belong to you', 401);
    }
  } catch (e: any) {
    next(e);
  }
};
