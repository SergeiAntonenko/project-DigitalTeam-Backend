import fs from 'node:fs/promises';
import path from 'node:path';
import { ENV_VARS, UPLOAD_DIR } from '../users/index.js';
import { env } from './env.js';

export const saveFileToLocalMachine = async (file) => {
  const newPath = path.join(UPLOAD_DIR, file.filename);
  await fs.rename(file.path, newPath); //rename changed readFile, writeFile & unlink

  return `${env(ENV_VARS.BACKEND_HOST)}/uploads/${file.filename}`;
};
