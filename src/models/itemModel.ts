import { NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import { model, Model, Schema, Types } from 'mongoose';

export interface IItem {
  _id: string | Types.ObjectId;
  name: string;
  owner: Types.ObjectId | string;
  collectionId: Types.ObjectId | string;
  description: string;
  optionalFields: {
    optionalTextValue1?: string;
    optionalTextValue2?: string;
    optionalTextValue3?: string;
    optionalNumberValue1?: number;
    optionalNumberValue2?: number;
    optionalNumberValue3?: number;
    optionalDateValue1?: Date;
    optionalDateValue2?: Date;
    optionalDateValue3?: Date;
    optionalCheckboxValue1?: boolean;
    optionalCheckboxValue2?: boolean;
    optionalCheckboxValue3?: boolean;
  };
  isLiked?: boolean;
  tags: string[];
  createdAt: Date;
}

export type ItemModel = Model<IItem>;

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Item must have a name'],
    },
    owner: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'Item must belong to owner'],
    },
    collectionId: {
      type: Types.ObjectId,
      ref: 'Collection',
      required: [true, 'Item must belong to collection'],
    },
    description: {
      type: String,
      required: [true, 'Item must have a description'],
    },
    optionalFields: {
      optionalTextValue1: {
        type: String,
        default: null,
        required: false,
      },
      optionalTextValue2: {
        type: String,
        default: null,
        required: false,
      },
      optionalTextValue3: {
        type: String,
        default: null,
        required: false,
      },
      optionalNumberValue1: {
        type: Number,
        default: null,
        required: false,
      },
      optionalNumberValue2: {
        type: Number,
        default: null,
        required: false,
      },
      optionalNumberValue3: {
        type: Number,
        default: null,
        required: false,
      },
      optionalDateValue1: {
        type: Date,
        default: null,
        required: false,
      },
      optionalDateValue2: {
        type: Date,
        default: null,
        required: false,
      },
      optionalDateValue3: {
        type: Date,
        default: null,
        required: false,
      },
      optionalCheckboxValue1: {
        type: Boolean,
        default: null,
        required: false,
      },
      optionalCheckboxValue2: {
        type: Boolean,
        default: null,
        required: false,
      },
      optionalCheckboxValue3: {
        type: Boolean,
        default: null,
        required: false,
      },
    },
    tags: [String],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

itemSchema.index({ '$**': 'text' });

itemSchema.virtual('likes', {
  ref: 'Like',
  foreignField: 'item',
  localField: '_id',
  count: true,
});

itemSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'item',
  localField: '_id',
});

const Item = model<IItem, ItemModel>('Item', itemSchema);

export default Item;
