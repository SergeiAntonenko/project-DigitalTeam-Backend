import { OAuth2Client } from 'google-auth-library';
import googleConfig from '../../google-oauth.json';
import { ENV_VARS } from '../constants/index.js';
import path from 'node:path';
import { readFile } from 'fs/promises';
import { env } from './env.js';
import createHttpError from 'http-errors';

const PATH_JSON = path.join(process.cwd(), 'google-oauth.json');
const googleConfig = JSON.parse(await readFile(PATH_JSON));

const googleClient = new OAuth2Client({
  clientId: env(ENV_VARS.GOOGLE_AUTH_CLIENT_ID),
  clientSecret: env(ENV_VARS.GOOGLE_AUTH_CLIENT_SECRET),
  redirectUri: googleConfig.web.redirect_uris[0],
});

export const generateAuthUrl = () => {
  return googleClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
};

export const validateGoogleOAuthCode = async (code) => {
  try {
    const { tokens } = await googleClient.getToken(code); //change code for the getToken
    const idToken = tokens.id_token;
    if (!idToken) throw createHttpError(401, 'Unauthorized');
    console.log(idToken);

    const ticket = await googleClient.verifyIdToken({ idToken }); // verifykating idToken
    return ticket;
  } catch (error) {
    console.log(error);
    throw createHttpError(500, 'Error during google auth authorization');
  }
};
