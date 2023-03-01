import { Request, Response } from 'express';
import Item from '../models/itemModel';
import { ISearchQueryParams } from '../types';

export const getResults = async (
  req: Request<unknown, unknown, unknown, ISearchQueryParams>,
  res: Response,
): Promise<void> => {
  const searchString = req.query.searchString;
  const results = await Item.aggregate([
    {
      $lookup: {
        from: 'collections',
        localField: 'collectionId',
        foreignField: '_id',
        as: 'collection',
      },
    },
    {
      $unwind: '$collection',
    },
    {
      $lookup: {
        from: 'users',
        localField: 'owner',
        foreignField: '_id',
        as: 'owner',
      },
    },
    {
      $unwind: '$owner',
    },
    // {
    //   $lookup: {
    //     from: 'reviews',
    //     localField: '_id',
    //     foreignField: 'item',
    //     as: 'review',
    //   },
    // },
    // {
    //   $unwind: '$review',
    // },
    {
      $match: {
        $or: [
          { name: { $regex: searchString } },
          { 'owner.email': { $regex: searchString } },
          { 'owner.name': { $regex: searchString } },
          { 'collection.theme': { $regex: searchString } },
          { 'collection.name': { $regex: searchString } },
          // { 'review.body': { $regex: searchString } },
        ],
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    count: results.length,
    data: {
      results,
    },
  });
};
