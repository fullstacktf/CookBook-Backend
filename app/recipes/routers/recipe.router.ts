import recipeController from '../controllers/recipe.controller';
import { Router } from 'express';
import { runInNewContext } from 'vm';
const router: Router = Router();

// get all recipes

router.get('/', (req, res, next) => {
  try {
    recipeController.getAllRecipes()
      .then(recipes => {
        res.status(200).json(recipes);
      })
      .catch(error => {
        next(`Error in the database when looking for recipes: ${error}`);
      });
  } catch (error) {
    next(`The database is empty: ${error}`);
  }
});

// get one recipe

router.get('/:id', async (req, res, next) => {
  try {
    recipeController.getRecipe(req.params.id)
      .then(recipe => {
        res.status(200).json(recipe);
      })
      .catch(error => {
        next(`Error in the database when looking for the recipe: ${error}`);
      });
  } catch (error) {
    next(`Error to get the recipe or the recipe not exist: ${error}`);
  }
});

// add new recipe

router.post('/', async (req, res, next) => {
  try {
    // if (isValid(req.body)([validator1, validator2, ...])) {
    recipeController.newRecipe(req.body)
      .then(recipe => {
        res.status(200).json(recipe);
      })
      .catch(error => {
        next(`Error in the database when saving: ${error}`);
      });
    // }
    // else {
    //     next('Invalid recipe')
    // }
  } catch (error) {
    next(`Error to save the recipe in the database: ${error}`);
  }
});

// // update a new recipe

router.put('/:id', async (req, res, next) => {
  try {
    recipeController.updateRecipe(req.params.id, req.body)
      .then(recipeUpdated => {
        res.status(200).json(recipeUpdated);
      })
      .catch(error => {
        next(`Error in the database when updating: ${error}`);
      });
  } catch (error) {
    next(`Error to update the recipe: ${error}`);
  }
});

// delete recipe

router.delete('/:id', async (req, res, next) => {
  try {
    recipeController.deleteRecipe(req.params.id, req.body)
      .then(recipeDeleted => {
        res.status(200).json(recipeDeleted);
      })
      .catch(error => {
        next(`Error in the database when deleting: ${error}`);
      });
  } catch (error) {
    next(`Error to delete the recipe: ${error}`);
  }
});

export = router;
