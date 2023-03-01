import { ICollection } from '../models/collectionModel';
import { IUser } from '../models/userModel';

export * from './user.controller.interfaces';
export * from './auth.controller.interfaces';
export * from './item.controller.interfaces';
export * from './collection.controller.interfaces';
export * from './search.controller.interfaces';
export * from './like.controller.interfaces';
export * from './review.controller.interfaces';

declare global {
  namespace Express {
    export interface Request {
      user?: IUser | undefined;
      // collection?: ICollection | undefined;
    }
  }
}
