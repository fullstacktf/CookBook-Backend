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

// get the recipes saved
router.get('/:user/savedrecipes', userController.getUserSavedRecipes);

// save recipes from other users
router.put('/:user/savedrecipes', userProfileValidator, userController.saveRecipesFromOtherUsers);

// delete saved recipes
router.put('/:user/savedrecipes/:rid', userProfileValidator, userController.deleteUserSavedRecipes);

// get follows from a user
router.get('/:user/follows', userController.getFollows);

// follow a user
router.put('/:user/follows', userProfileValidator, userController.saveFollow);

// delete a follow
router.put('/:user/follows/:username', userProfileValidator, userController.deleteFollow);


export = router;