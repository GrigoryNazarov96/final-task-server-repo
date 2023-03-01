import { Model, Types, model, Schema } from 'mongoose';

export interface IReview {
  _id: string | Types.ObjectId;
  author?: Types.ObjectId;
  item?: Types.ObjectId;
  body: string;
  createdAt: Date;
}

export type ReviewModel = Model<IReview>;

const reviewSchema = new Schema<IReview>({
  author: {
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to author'],
  },
  item: {
    type: Types.ObjectId,
    ref: 'Item',
    required: [true, 'Review must refer to item'],
  },
  body: {
    type: String,
    required: [true, 'Review must have a body text'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = model<IReview, ReviewModel>('Review', reviewSchema);

export default Review;
