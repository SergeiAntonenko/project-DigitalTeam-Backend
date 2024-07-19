import nodemailer from 'nodemailer';
import { ENV_VARS } from '../constants/index.js';
import { env } from './env.js';

const transporter = nodemailer.createTransport({
  host: env(ENV_VARS.SMTP_HOST),
  port: env(ENV_VARS.SMTP_PORT),

  secure: false,

  auth: {
    user: env(ENV_VARS.SMTP_USER),
    pass: env(ENV_VARS.SMTP_PASSWORD),
  },
});

export const sendEmail = async (options) => {
  await transporter.sendMail(options);
};
