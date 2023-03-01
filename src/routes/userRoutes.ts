import express from 'express';
import { login, protect, signup, restrictTo, logout } from '../controllers/authController';
import {
  changeUserRole,
  bulkChangeUserStatus,
  bulkDeleteUsers,
  createUser,
  getUsers,
  getUser,
} from '../controllers/userController';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/logout', logout);

router
  .route('/')
  .get(protect(), restrictTo('admin'), getUsers)
  .post(protect(), restrictTo('admin'), createUser)
  .patch(protect(), restrictTo('admin'), bulkChangeUserStatus)
  .delete(protect(), restrictTo('admin'), bulkDeleteUsers);

router.route('/:id').get(getUser).patch(protect(), restrictTo('admin'), changeUserRole);

export default router;
