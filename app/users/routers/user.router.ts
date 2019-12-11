import * as userController from '../controllers/user.controller';
import { Router } from 'express';
import { userProfileValidator } from '../helpers/user.validator';

const router: Router = Router();

// Get users
router.get('/', userController.getUsers);

// Get ONE user by id
router.get('/:id', userController.getUserByUsername);

// // Add new user
// router.post('/signup', validator, userController.signUp);

// // Sign in user
// router.post('/signin', validator, userController.signIn);

// sign out user
router.post('/signout', userController.signOut);

// Update new user
router.put('/:id', userController.updateUser);

// Delete user
router.delete('/:id', userController.deleteUser);

// get a user recipe
router.get('/:user/recipe', userController.getUserRecipes);

// save a user recipe
router.put('/:user/recipe', userProfileValidator, userController.saveUserRecipe);

// delete a user recipe
router.put('/:user/recipe/:rid', userProfileValidator, userController.deleteUserRecipe);

export = router;