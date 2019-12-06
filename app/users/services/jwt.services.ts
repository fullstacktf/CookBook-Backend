import jwt from 'jwt-simple';
import moment from 'moment';
import config from '../../config/config';
import { Error } from 'mongoose';

export const createToken = (user): string => {
  const payload = {
    sub: user.userName,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };

  return jwt.encode(payload, config.SECRET_TOKEN);
};

export const decodeToken = async (token): Promise<JsonWebKey> => {
  try {
    const decodedToken = await jwt.decode(token, config.SECRET_TOKEN);
    if (decodedToken.exp <= moment().unix()) {
      throw Error;
    }
    return decodedToken.sub;
  } catch (error) {
    throw Error;
  }
};