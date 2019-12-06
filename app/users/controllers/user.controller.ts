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

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  userServices.getUser(req.params.id)
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