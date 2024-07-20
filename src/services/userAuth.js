import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session';
import { HOUR, ONE_DAY } from '../db/models/userId';

export const loginUser = async (payload) => {
  const user = await UserCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User no found');
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + HOUR),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};
