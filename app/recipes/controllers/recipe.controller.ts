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
    .catch(() => {
      next('Error in the database when looking for recipes');
    });
};

export const getRecipe = async (req: Request, res: Response, next: NextFunction) => {
  recipeService.getRecipe(req.params.id)
    .then(recipe => {
      if (validateDeliverRecipe(recipe))
        return res.status(200).json(recipe);
      next('Error to get the recipe or the recipe does not exist.');
    })
    .catch(() => {
      next('Error in the database when looking for the recipe');
    });
};

export const newRecipe = async (req: Request, res: Response, next: NextFunction) => {
  recipeService.newRecipe(req.body)
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(() => {
      next('Error to save the recipe in the database');
    });
};

export const updateRecipe = async (req: Request, res: Response, next: NextFunction) => {
  recipeService.updateRecipe(req.params.id, req.body)
    .then(recipeUpdated => {
      res.status(200).json(recipeUpdated);
    })
    .catch(() => {
      next('Error updating the database');
    });
};

export const likeRecipe = async (req: Request, res: Response, next: NextFunction) => {
  recipeService.likeDislikeRecipe(req.params.id, req.body, true)
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(() => {
      next('Error updating the database');
    });
};

export const dislikeRecipe = async (req: Request, res: Response, next: NextFunction) => {
  recipeService.likeDislikeRecipe(req.params.id, req.body, false)
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(() => {
      next('Error updating the database');
    });
};

export const commentRecipe = async (req: Request, res: Response, next: NextFunction) => {
  recipeService.commentRecipe(req.params.id, req.body)
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(() => {
      next('Error updating the database');
    });
};

export const deleteCommentRecipe = async (req: Request, res: Response, next: NextFunction) => {
  recipeService.deleteCommentRecipe(req.params.id, req.params.cid)
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(() => {
      next('Error updating the database');
    });
};

export const deleteRecipe = async (req: Request, res: Response, next: NextFunction) => {
  recipeService.deleteRecipe(req.params.id)
    .then(recipeDeleted => {
      res.status(200).json(recipeDeleted);
    })
    .catch(() => {
      next('Error to delete the recipe');
    });
};