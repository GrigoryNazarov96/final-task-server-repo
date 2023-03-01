import express from 'express';
import { protect } from '../controllers/authController';
import {
  createLikeForItem,
  getLikesCountPerItem,
  removeLikeForItem,
} from '../controllers/likeController';

const router = express.Router();

router
  .route('/')
  .get(getLikesCountPerItem)
  .post(protect(), createLikeForItem)
  .delete(protect(), removeLikeForItem);

export default router;
