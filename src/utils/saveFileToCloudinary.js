import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.js';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.config({
  secure: true,
  cloud_name: env(CLOUDINARY.CLOUD_NAME),
  api_key: env(CLOUDINARY.API_KEY),
  api_secret: env(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file, options) => {
  const response = await cloudinary.uploader.upload(file.path, options);
  return response.secure_url;
};
