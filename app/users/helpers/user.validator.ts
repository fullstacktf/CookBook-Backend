/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { User, UserModel } from '../models/users.model';
import { Request, Response, NextFunction } from 'express';
import { decodeToken } from '../services/jwt.services';

const alreadyExist = async (field: object): Promise<UserModel> => {
  console.log('field ', field);
  const user = await User.findOne(field);
  console.log('await ' + user);
  return user;
};

const userExist = async (name: UserModel) => {
  await alreadyExist({ userName: name })
    .then(user => {
      if (user) {
        console.log('exist ' + user);
        return true;
      }
      else {
        console.log('else ' + user);
        return false;
      }
    })
    .catch(() => {
      console.log('ERROR');
      throw Error;
    });
};

const emailExist = async (email: UserModel) => {
  console.log(email);
  await alreadyExist({ email: email })
    .then(user => {
      if (user) {
        return true;
      }
      else return false;
    })
    .catch(() => {
      throw Error;
    });
};

const validator = async (req: Request, res: Response, next: NextFunction) => {
  if (!userExist(req.body.userName) && !emailExist(req.body.email)) next(); //undefined && undefined
  else res.status(400).json({ message: 'Email or user name already exist' });
};

export default validator;

export const userProfileValidator = async (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = await decodeToken(token);

  if (decodedToken === req.params.user)
    next();
  else
    next('Invalid access');

};