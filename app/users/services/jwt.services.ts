import jwt from 'jwt-simple';
import moment from 'moment';
import config from '../../config/config';

export const createToken = (user): string => {
  const payload = {
    sub: user.userName,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };

  return jwt.encode(payload, config.SECRET_TOKEN);
};