import { User } from '../models/users.model';

const alreadyExists = async (field): Promise<boolean> => {
  const user = await User.findOne({ field });
  if (user) return false; //comprobar que el ususario existe console.log(user.userName)
  else return true;

};

export const userExists = async (req, res, next) => {
  if (alreadyExists(req.body.userName)) next();
  else throw Error;
};

export const emailExist = async (req, res, next) => {
  if (alreadyExists(req.body.email)) next();
  else throw Error;
};