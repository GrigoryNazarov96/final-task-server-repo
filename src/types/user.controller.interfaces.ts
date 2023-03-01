import { IUser } from '../models/userModel';

export interface ICreateUserBodyParams {
  name: string;
  email: string;
  password: string;
}

export interface IChangeUsersStatusParams {
  users: object[];
  isBlock: boolean;
}

export interface IChangeUsersRoleBodyParams {
  users: string[];
  role: 'user' | 'admin';
}

export interface IDeleteUsersBodyParams {
  users: string[];
}

export interface IGetAllUsersQueryParams {
  isBlocked?: boolean;
  asc?: boolean;
  page?: number;
}
