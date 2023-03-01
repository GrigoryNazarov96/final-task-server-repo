import { IItem } from '../models/itemModel';
import { IUser } from '../models/userModel';

export interface IGetAllItemsQueryParams {
  tags?: string[];
  asc?: boolean;
  page?: number;
}

export interface IUpdateItemBodyParams {
  name?: string;
  description?: string;
  optionalFields?: {
    optionalTextValue1: string | null;
    optionalTextValue2: string | null;
    optionalTextValue3: string | null;
    optionalNumberValue1: number | null;
    optionalNumberValue2: number | null;
    optionalNumberValue3: number | null;
    optionalDateValue1: Date | null;
    optionalDateValue2: Date | null;
    optionalDateValue3: Date | null;
    optionalCheckboxValue1: boolean | null;
    optionalCheckboxValue2: boolean | null;
    optionalCheckboxValue3: boolean | null;
  };
  tags?: string[];
}

export interface IBulkDeleteBodyParams {
  items: IItem[];
}

export interface IGetItemBodyParams {
  user: IUser;
}
