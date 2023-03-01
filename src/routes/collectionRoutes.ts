import express from 'express';
import { protect } from '../controllers/authController';
import {
  getCollections,
  createCollection,
  getCollection,
  updateCollection,
  deleteCollection,
} from '../controllers/collectionController';

const router = express.Router();

router.route('/').get(getCollections).post(protect(), createCollection);
router
  .route('/:id')
  .get(protect({ allowNonAuthorized: true }), getCollection)
  .patch(protect(), updateCollection)
  .delete(protect(), deleteCollection);

export default router;
