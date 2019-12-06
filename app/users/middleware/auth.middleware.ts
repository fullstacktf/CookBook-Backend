import { decodeToken } from '../services/jwt.services';
import { NextFunction } from 'express';

export const auth = (req, res, next): NextFunction => {
  if (!req.headers.authorization)
    return res.status(403).json({ message: 'you don\'t have authorization' });

  const token = req.headers.authorization.split(' ')[1];

  decodeToken(token)
    .then(sub => {
      req.user = sub;
      next();
    })
    .catch(error => {
      next(`Error, Invalid token: ${error}`);
    });
};