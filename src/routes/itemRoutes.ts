import express from 'express';
import { protect } from '../controllers/authController';
import {
  bulkDeleteItems,
  createItem,
  getItems,
  getItem,
  updateItem,
} from '../controllers/itemController';

const router = express.Router();

router
  .route('/')
  .get(protect({ allowNonAuthorized: true }), getItems)
  .post(protect(), createItem)
  .delete(protect(), bulkDeleteItems);
router
  .route('/:id')
  .get(protect({ allowNonAuthorized: true }), getItem)
  .patch(protect(), updateItem);

export default router;
