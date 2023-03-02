import { Router } from 'express';
import { protect } from '../controllers/authController';
import { getFeatured } from '../controllers/collectionController';

const router = Router();

router.get('/', protect(), getFeatured);

export default router;
