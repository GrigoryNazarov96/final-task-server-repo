import { Model, Types, Schema, model } from 'mongoose';

export interface ICollection {
  _id: string | Types.ObjectId;
  name: string;
  description: string;
  imageCover: string;
  owner: Types.ObjectId | string;
  theme: string;
  items: Types.ObjectId[];
  optionalFields: {
    optionalTextTitle1: string | null;
    optionalTextTitle2: string | null;
    optionalTextTitle3: string | null;
    optionalNumberTitle1: string | null;
    optionalNumberTitle2: string | null;
    optionalNumberTitle3: string | null;
    optionalDateTitle1: string | null;
    optionalDateTitle2: string | null;
    optionalDateTitle3: string | null;
    optionalCheckboxTitle1: string | null;
    optionalCheckboxTitle2: string | null;
    optionalCheckboxTitle3: string | null;
  };
  createdAt: Date;
  updatedAt: Date;
}

export type CollectionModel = Model<ICollection>;

const collectionSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Collection must have a name'],
  },
  description: {
    type: String,
    required: true,
  },
  imageCover: String,
  owner: {
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'Item must have an owner'],
  },
  theme: {
    type: String,
    required: true,
  },
  optionalFields: {
    optionalTextTitle1: {
      type: String,
      default: null,
      required: false,
    },
    optionalTextTitle2: {
      type: String,
      default: null,
      required: false,
    },
    optionalTextTitle3: {
      type: String,
      default: null,
      required: false,
    },
    optionalNumberTitle1: {
      type: String,
      default: null,
      required: false,
    },
    optionalNumberTitle2: {
      type: String,
      default: null,
      required: false,
    },
    optionalNumberTitle3: {
      type: String,
      default: null,
      required: false,
    },
    optionalDateTitle1: {
      type: String,
      default: null,
      required: false,
    },
    optionalDateTitle2: {
      type: String,
      default: null,
      required: false,
    },
    optionalDateTitle3: {
      type: String,
      default: null,
      required: false,
    },
    optionalCheckboxTitle1: {
      type: String,
      default: null,
      required: false,
    },
    optionalCheckboxTitle2: {
      type: String,
      default: null,
      required: false,
    },
    optionalCheckboxTitle3: {
      type: String,
      default: null,
      required: false,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Collection = model<ICollection, CollectionModel>('Collection', collectionSchema);

export default Collection;
