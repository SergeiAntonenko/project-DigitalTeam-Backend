import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../users/index.js';

const storage = multer.diskStorage({
  estion: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

export const upload = multer({ storage: storage });
