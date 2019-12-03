/* eslint-disable @typescript-eslint/explicit-function-return-type */
import validateDeliverRecipe from '../helpers/recipe.helper';
import recipeService from '../services/Recipe.service';
import { Request, Response, NextFunction } from 'express';

export const getRecipes = async (req: Request, res: Response, next: NextFunction) => {
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

export const getRecipe = async (req: Request, res: Response, next: NextFunction) => {
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

export const newRecipe = async (req: Request, res: Response, next: NextFunction) => {
  recipeService.newRecipe(req.body)
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(error => {
      next(`Error to save the recipe in the database: ${error}`);
    });
};

export const updateRecipe = async (req: Request, res: Response, next: NextFunction) => {
  recipeService.updateRecipe(req.params.id, req.body)
    .then(recipeUpdated => {
      res.status(200).json(recipeUpdated);
    })
    .catch(error => {
      next(`Error in the database when updating: ${error}`);
    });
};

export const deleteRecipe = async (req: Request, res: Response, next: NextFunction) => {
  recipeService.deleteRecipe(req.params.id)
    .then(recipeDeleted => {
      res.status(200).json(recipeDeleted);
    })
    .catch(error => {
      next(`Error to delete the recipe: ${error}`);
    });
};