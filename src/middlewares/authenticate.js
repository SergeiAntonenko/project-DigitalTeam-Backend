import createHttpError from 'http-errors';
import { Session } from '../db/models/session.js';
import { User } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
      return next(createHttpError(401, 'Auth header is not provided!'));
    }

    const [bearer, token] = authHeader.split(' '); //деструктуризовано
    //=======second option=======
    // const bearer = authHeader.split(' ')[0];
    //  const token = authHeader.split(' ')[1];

    //if is not 'bearer' or 'token'

    if (bearer !== 'Bearer' || !token) {
      return next(
        createHttpError(401, 'Auth header should be of type Bearer!'),
      );
    }

    //Search session in the collection 'Sessions' based on a provided access token.
    const session = await Session.findOne({ accessToken: token });
    if (!session) {
      return next(createHttpError(401, 'Session not found'));
    }

    //     //Check, Check if the access token expiration date has passed by comparing the current date with the token's expiration date.
    const isAccessTokenExpired =
      new Date() > new Date(session.accessTokenValidUntil);
    if (isAccessTokenExpired) {
      return next(createHttpError(401, 'Access token expired'));
    }

    // Check the user in the 'Users' collection by the user identifier stored in the session.
    const user = await User.findOne(session.userId);
    if (!user) {
      return next(createHttpError(401, 'User this session is not found!'));
    }

    // Add user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Error in authenticate middleware:', error);
    return next(createHttpError(500, 'Internal Server Error'));
  }
};
