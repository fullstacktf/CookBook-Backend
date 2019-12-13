/* eslint-disable @typescript-eslint/explicit-function-return-type */
import userServices from '../services/user.services';
import { Request, Response, NextFunction } from 'express';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  userServices.getUsers()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(() => {
      next('Error in the db looking for users');
    });
};

export const getUserByUsername = async (req: Request, res: Response, next: NextFunction) => {
  userServices.getUserByUsername(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(() => {
      next('Error looking the user');
    });
};

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  userServices.signUp(req.body)
    .then(token => {
      res.status(200).json(token);
    })
    .catch(() => {
      next('Error sign up');
    });
};

export const signOut = async (req: Request, res: Response, next: NextFunction) => {
  userServices.signOut(req.body)
    .then(() => {
      res.status(200).json({ message: 'sign out succesfully' });
    })
    .catch(() => {
      next('Error sign out');
    });
};

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  userServices.signIn(req.body)
    .then(token => {
      res.status(200).json(token);
    })
    .catch(() => {
      next('Error sign in');
    });
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  userServices.updateUser(req.params.id, req.body)
    .then(userDeleted => {
      res.status(200).json(userDeleted);
    })
    .catch(() => {
      next('Error in db trying to delete user');
    });
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  userServices.deleteUser(req.params.id)
    .then(userDeleted => {
      res.status(200).json(userDeleted);
    })
    .catch(() => {
      next('Error in DB deleting user');
    });
};

export const getUserRecipes = async (req: Request, res: Response, next: NextFunction) => {
  userServices.getUserRecipes(req.params.user)
    .then(userRecipes => {
      res.status(200).json(userRecipes);
    })
    .catch(() => {
      next('Error in the db looking for users recipes');
    });
};

export const saveUserRecipe = async (req: Request, res: Response, next: NextFunction) => {
  userServices.saveUserRecipe(req.params.user, req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(() => {
      next('Error in the db saving users recipes');
    });
};

export const deleteUserRecipe = async (req: Request, res: Response, next: NextFunction) => {
  userServices.deleteUserRecipe(req.params.user, req.body)
    .then(userRecipes => {
      res.status(200).json(userRecipes);
    })
    .catch(() => {
      next('Error in the db deleting users recipes');
    });
};

export const getUserSavedRecipes = async (req: Request, res: Response, next: NextFunction) => {
  userServices.getUserSavedRecipes(req.params.user)
    .then(recipes => {
      res.status(200).json(recipes);
    })
    .catch(() => {
      next('Error in the db looking for recipes from other users');
    });
};

export const saveRecipesFromOtherUsers = async (req: Request, res: Response, next: NextFunction) => {
  userServices.saveRecipesFromOtherUsers(req.params.user, req.body)
    .then(recipes => {
      res.status(200).json(recipes);
    })
    .catch(() => {
      next('Error in the db saving recipes from other users');
    });
};

export const deleteUserSavedRecipes = async (req: Request, res: Response, next: NextFunction) => {
  userServices.deleteUserSavedRecipes(req.params.user, req.body)
    .then(userRecipes => {
      res.status(200).json(userRecipes);
    })
    .catch(() => {
      next('Error in the db deleting recipes from other users');
    });
};