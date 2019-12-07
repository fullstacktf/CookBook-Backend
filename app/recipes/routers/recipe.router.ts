import * as recipeController from '../controllers/recipe.controller';
import validator, { recipeValidationRules } from '../helpers/recipe.validator';
import { Router } from 'express';

const router: Router = Router();

// get all recipes
router.get('/', recipeController.getRecipes);

// get one recipe
router.get('/:id', recipeController.getRecipe);

// add new recipe
router.post('/', recipeValidationRules(), validator, recipeController.newRecipe);

// update a new recipe
router.put('/:id', recipeValidationRules(), validator, recipeController.updateRecipe);

// like
router.put('/:id/like', recipeValidationRules(), validator, recipeController.likeRecipe);

// dislike
router.put('/:id/dislike', recipeValidationRules(), validator, recipeController.dislikeRecipe);

// comment
router.put('/:id/comment', recipeController.commentRecipe); // need comments validator

// delete a comment
router.put('/:id/deletecomment', recipeController.deleteCommentRecipe); // need comments validator

// delete recipe
router.delete('/:id', recipeController.deleteRecipe);

export = router;
