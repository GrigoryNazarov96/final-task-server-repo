// import { Types } from 'mongoose';

export interface IUpdateCollectionBodyParams {
  name?: string;
  description?: string;
  owner?: string;
  imageCover?: string;
  theme?: string;
  updatedAt: Date;
  optionalFields?: {
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
}

export interface IGetCollectionsQueryParams {
  asc?: boolean;
  page?: number;
}

export interface IFeaturedQueryParams {
  type?: string;
}
