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

// delete recipe
router.delete('/:id', recipeController.deleteRecipe);

// like
router.put('/:id/like', recipeValidationRules(), validator, recipeController.likeRecipe);

// dislike
router.put('/:id/dislike', recipeValidationRules(), validator, recipeController.dislikeRecipe);

//getLikes
router.get('/:id/like', recipeController.getlikeRecipe);

// comment
router.put('/:id/comment', recipeController.commentRecipe); // need comments validator

// delete a comment
router.put('/:id/comment/:cid', recipeController.deleteCommentRecipe); // need comments validator

// get a comment
router.get('/:id/comment/:cid', recipeController.getCommentRecipe);

// get comments
router.get('/:id/comment/', recipeController.getCommentsRecipe);

// upload images
router.post('/:id/images', recipeController.uploadImage); // need validator

// get images
router.get('/:id/images', recipeController.getImages);

// delete a image
router.put('/:id/images/:iid', recipeController.deleteImage);


export = router;
