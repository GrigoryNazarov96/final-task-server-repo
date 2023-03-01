import { ILike } from '../models/likeModel';

export interface ILikeQueryParams {
  item: ILike['item'];
  from: ILike['from'];
}
export interface ILikeBodyParams {
  item: ILike['item'];
  from: ILike['from'];
}
