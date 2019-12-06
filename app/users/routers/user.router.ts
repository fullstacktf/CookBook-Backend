import * as userController from '../controllers/user.controller';
import { Router } from 'express';
// import validator from '../helpers/user.validator';

const router: Router = Router();

// Get users
router.get('/', userController.getUsers);

// Get ONE user by id
router.get('/:id', userController.getUser);

// // Add new user
// router.post('/signup', validator, userController.signUp);

// // Sign in user
// router.post('/signin', validator, userController.signIn);

// Update new user
router.put('/:id', userController.updateUser);

// Delete user
router.delete('/:id', userController.deleteUser);

export = router;