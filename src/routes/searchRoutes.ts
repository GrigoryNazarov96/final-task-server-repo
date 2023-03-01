import express from 'express';
import { getResults } from '../controllers/searchController';

const router = express.Router();

router.get('/', getResults);

export default router;
