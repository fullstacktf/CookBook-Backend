import * as userController from '../controllers/user.controller';
import { Router } from 'express';

const router: Router = Router();

// Get users
router.get('/', userController.getUsers);

// Get ONE user by id
router.get('/:id', userController.getUser);

// Add new user
router.post('/signup', userController.signUp);

// Sign in user
router.post('/signin', userController.signIn);

// Update new user
router.put('/:id', userController.updateUser);

// Delete user
router.delete('/:id', userController.deleteUser);

export = router;