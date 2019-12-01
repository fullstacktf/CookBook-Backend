import validateDeliverRecipe from '../helpers/recipe.helper';
import recipeService from '../services/Recipe.service';

export const getRecipes = async (req, res, next) => {
  recipeService.getRecipes()
    .then(recipes => {
      if (validateDeliverRecipe(recipes))
        return res.status(200).json(recipes);
      next('The database is empty.');
    })
    .catch(error => {
      next(`Error in the database when looking for recipes: ${error}`);
    });
};

export const getRecipe = async (req, res, next) => {
  recipeService.getRecipe(req.params.id)
    .then(recipe => {
      if (validateDeliverRecipe(recipe))
        return res.status(200).json(recipe);
      next('Error to get the recipe or the recipe does not exist.');
    })
    .catch(error => {
      next(`Error in the database when looking for the recipe: ${error}`);
    });
};

export const newRecipe = async (req, res, next) => {
  try {
    recipeService.newRecipe(req.body)
      .then(recipe => {
        res.status(200).json(recipe);
      })
      .catch(error => {
        next(`Error in the database when saving: ${error}`);
      });
  } catch (error) {
    next(`Error to save the recipe in the database: ${error}`);
  }
};

export const updateRecipe = async (req, res, next) => {
  try {
    recipeService.updateRecipe(req.params.id, req.body)
      .then(recipeUpdated => {
        res.status(200).json(recipeUpdated);
      })
      .catch(error => {
        next(`Error in the database when updating: ${error}`);
      });
  } catch (error) {
    next(`Error to update the recipe: ${error}`);
  }
};

export const deleteRecipe = async (req, res, next) => {
  try {
    recipeService.deleteRecipe(req.params.id)
      .then(recipeDeleted => {
        res.status(200).json(recipeDeleted);
      })
      .catch(error => {
        next(`Error in the database when deleting: ${error}`);
      });
  } catch (error) {
    next(`Error to delete the recipe: ${error}`);
  }
};