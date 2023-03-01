import { Types } from 'mongoose';
import { IUser } from '../models/userModel';

export interface IReviewQueryParams {
  item?: string | Types.ObjectId;
  author?: string | Types.ObjectId;
  user?: IUser;
}

export interface IReviewBodyParams {
  item: string | Types.ObjectId;
  body: string;
  author: string | Types.ObjectId;
}
