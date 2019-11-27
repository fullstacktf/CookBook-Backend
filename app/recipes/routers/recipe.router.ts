import recipeController from '../controllers/recipe.controller';
import validateDeliverRecipe from '../helpers/recipe.helper';
import recipeValidator from '../helpers/recipe.validator';
import { check, validationResult, body } from 'express-validator';
import { Router } from 'express';

const router: Router = Router();

// get all recipes
router.get('/', (req, res, next) => {
  recipeController.getAllRecipes()
    .then(recipes => {
      if (validateDeliverRecipe(recipes))
        return res.status(200).json(recipes);
      next('The database is empty.');
    })
    .catch(error => {
      next(`Error in the database when looking for recipes: ${error}`);
    });
});

// get one recipe
router.get('/:id', async (req, res, next) => {
  recipeController.getRecipe(req.params.id)
    .then(recipe => {
      if (validateDeliverRecipe(recipe))
        return res.status(200).json(recipe);
      next('Error to get the recipe or the recipe does not exist.');
    })
    .catch(error => {
      next(`Error in the database when looking for the recipe: ${error}`);
    });
});

// add new recipe
router.post('/', recipeValidator,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      recipeController.newRecipe(req.body)
        .then(recipe => {
          res.status(200).json(recipe);
        })
        .catch(error => {
          next(`Error in the database when saving: ${error}`);
        });
    } catch (error) {
      next(`Error to save the recipe in the database: ${error}`);
    }
  });

// router.post('/', async (req, res, next) => {
//   try {
//     // if (isValid(req.body)([validator1, validator2, ...])) {
//     recipeController.newRecipe(req.body)
//       .then(recipe => {
//         res.status(200).json(recipe);
//       })
//       .catch(error => {
//         next(`Error in the database when saving: ${error}`);
//       });
//     // }
//     // else {
//     //     next('Invalid recipe')
//     // }
//   } catch (error) {
//     next(`Error to save the recipe in the database: ${error}`);
//   }
// });

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
    recipeController.deleteRecipe(req.params.id)
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
