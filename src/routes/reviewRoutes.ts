import express from 'express';
import { protect } from '../controllers/authController';
import {
  createReviewForItem,
  deleteReviewForItem,
  getOneReviewPerItem,
  getReviewsPerItem,
} from '../controllers/reviewController';

const router = express.Router();

router
  .route('/')
  .get(protect({ allowNonAuthorized: true }), getReviewsPerItem)
  .post(protect(), createReviewForItem);

router.route('/:id').delete(protect(), deleteReviewForItem);

export default router;
