import * as recipeController from '../controllers/recipe.controller';
import validator, { recipeValidationRules } from '../helpers/recipe.validator';
//import validateDeliverRecipe from '../helpers/recipe.helper';
import { Router } from 'express';

const router: Router = Router();

// get all recipes
router.get('/', recipeController.getRecipes);

// get one recipe
router.get('/:id', recipeController.getRecipe);

// add new recipe
router.post('/', recipeValidationRules(), validator, recipeController.newRecipe);

// // update a new recipe
router.put('/:id', recipeController.updateRecipe);

// delete recipe
router.delete('/:id', recipeController.deleteRecipe);

export = router;
