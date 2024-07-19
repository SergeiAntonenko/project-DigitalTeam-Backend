import { v2 as cloudinary } from 'cloudinary';
import { ENV_VARS } from '../constants/index.js';
import { env } from './env.js';

cloudinary.config({
  cloud_name: env(ENV_VARS.CLOUDINARY_NAME),
  api_key: env(ENV_VARS.CLOUDINARY_API_KEY),
  api_secret: env(ENV_VARS.CLOUDINARY_API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.uploader.upload(file.path);
  return response.secure_url;
};
