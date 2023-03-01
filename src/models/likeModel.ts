import { Model, Types, Schema, model } from 'mongoose';

export interface ILike {
  _id: string | Types.ObjectId;
  from: Types.ObjectId | undefined;
  item: Types.ObjectId | undefined;
}

export type LikeModel = Model<ILike>;

const likeSchema = new Schema({
  from: {
    type: Types.ObjectId,
    ref: 'User',
  },
  item: {
    type: Types.ObjectId,
    ref: 'Item',
  },
});

likeSchema.index({ from: 1, item: 1 }, { unique: true });

const Like = model<ILike, LikeModel>('Like', likeSchema);

export default Like;
